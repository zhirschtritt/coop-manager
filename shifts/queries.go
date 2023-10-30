package shifts

import (
	"context"
	"time"

	"encore.app/db/models"
	"encore.app/lib"
	"encore.app/users"
	"encore.dev/beta/auth"
	"encore.dev/beta/errs"
	"encore.dev/types/uuid"
	"github.com/samber/lo"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

type GetShiftsRequest struct {
	OrgId string `json:"orgId" validate:"required,numeric"`
	Query struct {
		From time.Time `json:"from" validate:"required"`
		To   time.Time `json:"to" validate:"required"`
	} `json:"query" validate:"required"`

	Limit  *int    `json:"limit" validate:"omitempty,gt=0,lte=100"`
	Cursor *string `json:"cursor" validate:"omitempty,base64"`
}

func (req GetShiftsRequest) Validate() error {
	return lib.Validate.Struct(req)
}

type ShiftResponse struct {
	ID             uuid.UUID `json:"id"`
	OrganizationId string    `json:"organizationId"`
	StartsAt       time.Time `json:"startsAt"`
	EndsAt         time.Time `json:"endsAt"`
	Notes          string    `json:"notes"`
	ShiftTypeID    uuid.UUID `json:"shiftTypeId" validate:"uuid"`
	ShiftTermId    uuid.UUID `json:"shiftTermId" validate:"omitempty,uuid"`
}

type GetShiftsResponse struct {
	Results []*ShiftResponse   `json:"results"`
	Meta    lib.PaginationMeta `json:"meta"`
}

//encore:api auth path=/shifts
func (s ShiftService) GetAll(ctx context.Context, req *GetShiftsRequest) (*GetShiftsResponse, error) {
	orgId := auth.Data().(*users.UserData).OrgId

	query := []qm.QueryMod{}

	if req.Cursor != nil {
		decoded, err := s.idPaginationCodec.Decode(*req.Cursor)
		if err != nil {
			return nil, errs.WrapCode(err, errs.InvalidArgument, "invalid cursor")
		}

		shiftId := decoded["id"]
		orderBy := decoded["orderBy"]

		if orderBy != "id,start_at" {
			return nil, errs.WrapCode(err, errs.InvalidArgument, "invalid cursor, orderBy must be id,start_at")
		}

		_, err = uuid.FromString(shiftId)
		if err != nil {
			return nil, errs.WrapCode(err, errs.InvalidArgument, "cursor is not correctly formatted")
		}

		query = append(query, models.ShiftWhere.ID.GT(shiftId))
	}

	query = append(query,
		// + 1 for pagination check
		qm.Limit(getLimit(req)+1),
		// TODO: pass OrderBy in query (_always_ use `id` however)
		qm.OrderBy("id, start_at"),
		models.ShiftWhere.OrganizationID.EQ(orgId),
		models.ShiftWhere.StartAt.GTE(req.Query.From),
		models.ShiftWhere.EndAt.LT(req.Query.To),
	)

	shifts, err := models.Shifts(query...).All(ctx, s.db)
	if err != nil {
		return nil, errs.WrapCode(err, errs.Internal, "unable to get shifts")
	}

	var nextPageCursor string
	// if we retrieved the +1 more than the limit the we pop off the extra shift and encode a new cursor
	if len(shifts) > getLimit(req) {
		shifts = shifts[:len(shifts)-1]

		nextPageCursor, err = s.idPaginationCodec.Encode([]lib.CursorSingleContext{
			{Name: "id", Value: shifts[len(shifts)-1].ID},
			{Name: "orderBy", Value: "id,start_at"},
		})
		if err != nil {
			return nil, errs.WrapCode(err, errs.Internal, "unable to encode cursor")
		}
	}

	results := lo.Map[*models.Shift, *ShiftResponse](shifts, func(shift *models.Shift, _ int) *ShiftResponse {
		return &ShiftResponse{
			ID:             mustUUIDFromString(shift.ID),
			OrganizationId: shift.OrganizationID,
			StartsAt:       shift.StartAt,
			EndsAt:         shift.EndAt,
			Notes:          shift.Notes,
			ShiftTypeID:    mustUUIDFromString(shift.ShiftTypeID),
			// If the shift is not assigned to a term, the ID will be an all-zeros UUID (uuid.Nil)
			ShiftTermId: uuid.FromStringOrNil(shift.ShiftTermID.String),
		}
	})

	return &GetShiftsResponse{
		Results: results,
		Meta:    lib.PaginationMeta{NextPageCursor: &nextPageCursor},
	}, nil
}

func mustUUIDFromString(s string) uuid.UUID {
	return uuid.Must(uuid.FromString(s))
}

func getLimit(req *GetShiftsRequest) int {
	var limit int
	if req.Limit == nil {
		limit = 100
	} else {
		limit = lo.Clamp[int](*req.Limit, 0, 100)
	}
	return limit
}

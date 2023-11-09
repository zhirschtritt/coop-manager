package shifts

import (
	"context"
	"database/sql"

	"encore.app/db"
	m "encore.app/db/models"
	"encore.app/lib"
	"encore.app/shifts/shift_events"
	"encore.app/users"
	"encore.dev/beta/auth"
	"encore.dev/beta/errs"
	"encore.dev/rlog"
	"encore.dev/storage/sqldb"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

var coreDb = sqldb.Named("core").Stdlib()

//encore:service
type ShiftService struct {
	db                *db.DB
	idPaginationCodec lib.CursorCodec
}

func initShiftService() (*ShiftService, error) {
	codec := lib.MustNewCursorCodec("shiftsV1", []string{"id", "orderBy"}, "::")

	shift_events.InitEventListeners()

	return &ShiftService{db: db.New(coreDb), idPaginationCodec: codec}, nil
}

type AssignRequest struct {
	ShiftId  string `json:"shiftId" validate:"required,uuid"`
	MemberId string `json:"memberId" validate:"required,uuid"`
	Actor    struct {
		Type string `json:"type" validate:"required,oneof=user,system"`
		ID   string `json:"id" validate:"required,uuid"`
	} `json:"actor" validate:"required"`
}

func (req AssignRequest) Validate() error {
	return lib.Validate.Struct(req)
}

type AssignResponse struct {
	EventID string `json:"eventId"`
}

//encore:api auth path=/shifts/assign
func (s ShiftService) Assign(ctx context.Context, req *AssignRequest) (*AssignResponse, error) {
	eventId := lib.ChainUUIDV5(shift_events.ShiftEventNS, req.ShiftId, req.MemberId).String()

	err := s.db.DoTx(ctx, nil, func(tx *sql.Tx) error {
		existingShiftAssignment, err := m.ShiftAssignments(
			m.ShiftAssignmentWhere.ShiftID.EQ(req.ShiftId),
			m.ShiftAssignmentWhere.MemberID.EQ(req.MemberId),
		).One(ctx, tx)

		if err != nil {
			return errs.Wrap(err, "fetching shift assignment")
		}
		if existingShiftAssignment != nil {
			rlog.Debug("shift assignment already exists for shift+member", "shiftId", req.ShiftId, "memberId", req.MemberId)
			return nil
		}

		// else, create new shift assignment event
		event := &m.CoopEvent{
			ID:             eventId,
			OrganizationID: auth.Data().(*users.UserData).OrgId,
			Type:           string(shift_events.ShiftAssignedEventType),
			ScopeType:      shift_events.ShiftScopeType,
			ScopeID:        req.ShiftId,
			Data: shift_events.ShiftAssignedEventData{
				ShiftID:  req.ShiftId,
				MemberID: req.MemberId,
			}.ToJSON(),
		}

		err = event.Insert(ctx, tx, boil.Infer())
		if err != nil {
			return errs.Wrap(err, "saving shift-assigned event")
		}
		return nil
	})

	if err != nil {
		return nil, errs.Wrap(err, "assigning shift")
	}

	return &AssignResponse{EventID: eventId}, nil
}

package shifts

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/bufbuild/connect-go"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"

	"github.com/thoas/go-funk"
	util "github.com/zhirschtritt/coop_manager/internal"
	"github.com/zhirschtritt/coop_manager/internal/db"
	"github.com/zhirschtritt/coop_manager/internal/models"
	"github.com/zhirschtritt/coop_manager/internal/shifts/slots"

	coopv1 "github.com/zhirschtritt/coop_manager/rpc/gen/coop_manager/v1"
)

type Service struct {
	paginationCodec *util.PaginationCodec
	slotRepo        slots.SlotRepository
}

type assignShiftRequest struct {
	userId   string
	shiftId  string
	slotId   *string
	slotName *string
}

func (s Service) FindOrCreateSlot(slot *slots.Slot) (*slots.Slot, error) {
	if slot == nil {
		return nil, errors.New("missing slot on find or create")
	}

	if slot.Id != nil {
		res, err := s.slotRepo.GetById(*slot.Id)
		if err != nil {
			return nil, fmt.Errorf("getting slot by id: %w", err)
		}
		if res != nil {
			return res, nil
		}
	}

	if err := s.slotRepo.Create(slot); err != nil {
		return nil, fmt.Errorf("creating new slot: %w", err)
	}

	return slot, nil
}

func (s Service) AssignShift(
	ctx context.Context,
	req assignShiftRequest,
) (shiftAssignmentId string, err error) {

	s.shiftModel.ShiftAssignments(qm.Where("shift"))

	return res, nil
}

func (s Service) UnassignShift(
	ctx context.Context,
	req *connect.Request[coopv1.UnassignShiftRequest],
) (*connect.Response[coopv1.UnassignShiftResponse], error) {
	// sessionContainer := session.GetSessionFromRequestContext(ctx)
	// fmt.Println(sessionContainer.GetUserID())

	user, err := models.Members(qm.Where("id = ?", req.Msg.UserId)).AllG(ctx)

	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&coopv1.UnassignShiftResponse{})

	return res, nil
}

func (s Service) ListShifts(
	ctx context.Context,
	req *connect.Request[coopv1.ListShiftsRequest],
) (*connect.Response[coopv1.ListShiftsResponse], error) {
	limit := 100
	if req.Msg.Limit > 0 && req.Msg.Limit <= 100 {
		limit = int(req.Msg.Limit)
	} else {
		return nil, fmt.Errorf("limit it out of bounds: %d", req.Msg.Limit)
	}

	query := []qm.QueryMod{
		qm.OrderBy("id asc, start_at asc"),
		qm.Limit(limit + 1),
	}

	if req.Msg.NextPageCursor != "" {
		if cursorContext, err := s.paginationCodec.Decode(req.Msg.NextPageCursor); err != nil {
			return nil, err
		} else {
			id, startAt := cursorContext[0], cursorContext[1]

			query = append(query, qm.And("id > ?", id), qm.And("start_at > ?", startAt))
		}
	}

	var shifts models.ShiftSlice

	db.RunInTxForOrg(
		ctx,
		&sql.TxOptions{Isolation: sql.LevelReadCommitted, ReadOnly: true},
		req.Msg.OrganizationId,
		func(tx *sql.Tx) error {
			if res, err := models.Shifts(query...).All(ctx, tx); err != nil {
				return err
			} else {
				shifts = res
			}
			return nil
		},
	)

	var nextPageCursor string
	if len(shifts) > limit {
		// remove the last "extra" item and encode the last
		shifts = shifts[:len(shifts)-1]
		last := shifts[0]
		nextPageCursor = s.paginationCodec.Encode(last.ID, last.StartAt.String())
	}

	shiftList := funk.Map(shifts, func(shift models.Shift) coopv1.ShiftDetails {
		return coopv1.ShiftDetails{
			Id:       shift.ID,
			StartsAt: util.TimeToProto(shift.StartAt),
			EndsAt:   util.TimeToProto(shift.EndAt),
		}
	}).([]*coopv1.ShiftDetails)

	res := connect.NewResponse(&coopv1.ListShiftsResponse{
		Shifts:         shiftList,
		NextPageCursor: nextPageCursor,
	})

	return res, nil
}

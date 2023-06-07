package shifts

import (
	"context"
	"time"

	"github.com/bufbuild/connect-go"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/zhirschtritt/coop_manager/models"
	coopv1 "github.com/zhirschtritt/coop_manager/rpc/gen/coop_manager/v1"
)

type ShiftHandler struct{}

func (s *ShiftHandler) AssignShift(
	ctx context.Context,
	req *connect.Request[coopv1.AssignShiftRequest],
) (*connect.Response[coopv1.AssignShiftResponse], error) {
	// sessionContainer := session.GetSessionFromRequestContext(ctx)
	// fmt.Println(sessionContainer.GetUserID())

	res := connect.NewResponse(&coopv1.AssignShiftResponse{
		ShiftAssignmentId: "test",
	})

	return res, nil
}
func (s *ShiftHandler) UnassignShift(
	ctx context.Context,
	req *connect.Request[coopv1.UnassignShiftRequest],
) (*connect.Response[coopv1.UnassignShiftResponse], error) {
	// sessionContainer := session.GetSessionFromRequestContext(ctx)
	// fmt.Println(sessionContainer.GetUserID())

	res := connect.NewResponse(&coopv1.UnassignShiftResponse{})

	return res, nil
}
func (s *ShiftHandler) ListShifts(
	ctx context.Context,
	req *connect.Request[coopv1.ListShiftsRequest],
) (*connect.Response[coopv1.ListShiftsResponse], error) {
	// sessionContainer := session.GetSessionFromRequestContext(ctx)
	// fmt.Println(sessionContainer.GetUserID())

	shiftsList := []*coopv1.ShiftDetails{}

	shifts, err := models.Shifts().AllG(ctx)
	if err != nil {
		return nil, err
	}

	for _, s := range shifts {
		shiftsList = append(shiftsList, &coopv1.ShiftDetails{
			Id:       s.ID,
			StartsAt: timeToProto(s.StartAt),
			EndsAt:   timeToProto(s.EndAt),
		})
	}

	res := connect.NewResponse(&coopv1.ListShiftsResponse{
		Shifts:         shiftsList,
		NextPageCursor: "",
	})

	return res, nil
}

func timeToProto(time time.Time) *timestamppb.Timestamp {
	return &timestamppb.Timestamp{Nanos: int32(time.UnixNano())}
}

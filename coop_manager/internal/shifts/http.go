package shifts

import (
	"context"
	"errors"

	"github.com/bufbuild/connect-go"

	coopv1 "github.com/zhirschtritt/coop_manager/rpc/gen/coop_manager/v1"
)

/* Buf connect layer for Shift Service */
type ShiftHandlerConnect struct {
	service *Service
}

func (s *ShiftHandlerConnect) AssignShift(
	ctx context.Context,
	req *connect.Request[coopv1.AssignShiftRequest],
) (*connect.Response[coopv1.AssignShiftResponse], error) {
	// sessionContainer := session.GetSessionFromRequestContext(ctx)
	// fmt.Println(sessionContainer.GetUserID())

	return nil, errors.New("not implemented")
}

func (s *ShiftHandlerConnect) UnassignShift(
	ctx context.Context,
	req *connect.Request[coopv1.UnassignShiftRequest],
) (*connect.Response[coopv1.UnassignShiftResponse], error) {
	return nil, errors.New("not implemented")
}

func (s *ShiftHandlerConnect) ListShifts(
	ctx context.Context,
	req *connect.Request[coopv1.ListShiftsRequest],
) (*connect.Response[coopv1.ListShiftsResponse], error) {
	return nil, errors.New("not implemented")
}

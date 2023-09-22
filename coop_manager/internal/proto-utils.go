package coop_manager

import (
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func TimeToProto(time time.Time) *timestamppb.Timestamp {
	return &timestamppb.Timestamp{Nanos: int32(time.UnixNano())}
}

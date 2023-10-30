package core

import (
	"context"
	"time"
)

type PingResponse struct {
	Timestamp string
}

//encore:api public path=/ping
func Ping(ctx context.Context) (*PingResponse, error) {
	return &PingResponse{Timestamp: time.Now().Format(time.RFC3339)}, nil
}

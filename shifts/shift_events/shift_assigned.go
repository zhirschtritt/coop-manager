package shift_events

import (
	"context"
	"encoding/json"

	"encore.app/db/models"
	"encore.app/events"
	"encore.app/lib"
	"encore.dev/beta/errs"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/types"
)

type ShiftAssignedEvent struct {
	events.Event
	Data ShiftAssignedEventData `json:"data"`
}

type ShiftAssignedEventData struct {
	ShiftID  string `json:"shiftId" validate:"required,uuid"`
	MemberID string `json:"memberId" validate:"required,uuid"`
}

func (s ShiftAssignedEventData) Validate() error {
	return lib.Validate.Struct(s)
}

func (s ShiftAssignedEventData) ToJSON() types.JSON {
	json, err := json.Marshal(s)
	if err != nil {
		panic(err)
	}
	return json
}

func ShiftAssignedEventHandler(ctx context.Context, db boil.ContextExecutor, e *models.CoopEvent) error {
	if e == nil {
		return nil
	}
	if e.Type != string(ShiftAssignedEventType) {
		return nil
	}

	var eventData ShiftAssignedEventData
	err := json.Unmarshal(e.Data, &eventData)
	if err != nil {
		return errs.WrapCode(err, errs.InvalidArgument, "invalid event data")
	}

	shiftAssignment := &models.ShiftAssignment{
		OrganizationID: e.OrganizationID,
		MemberID:       eventData.MemberID,
		ShiftID:        eventData.ShiftID,
		CreatedBy:      e.ID,
	}

	err = shiftAssignment.Insert(ctx, db, boil.Infer())
	if err != nil {
		return errs.WrapCode(err, errs.Internal, "failed to insert shift assignment")
	}

	return nil
}

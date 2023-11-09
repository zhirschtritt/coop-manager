package shift_events

import (
	"encore.app/db/models"
	"encore.dev/types/uuid"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

const ShiftScopeType = "shift"

// NB: this UUID should _never_ change
const shiftEventNamespaceUUID = "0e57786a-6398-42e0-9f2a-e4b3448ad76b"

var ShiftEventNS = uuid.Must(uuid.FromString(shiftEventNamespaceUUID))

type ShiftEventType string

const (
	ShiftAssignedEventType   ShiftEventType = "shift-assigned"
	ShiftUnassignedEventType ShiftEventType = "shift-assigned"
	ShiftRemovedEventType    ShiftEventType = "shift-removed"
	ShiftUpdatedEventType    ShiftEventType = "shift-updated"
	ShiftCreatedEventType    ShiftEventType = "shift-created"
)

func InitEventListeners() {
	models.AddCoopEventHook(boil.BeforeInsertHook, ShiftAssignedEventHandler)
}

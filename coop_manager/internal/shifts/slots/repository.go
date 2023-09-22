package slots

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/zhirschtritt/coop_manager/internal/models"
)

type Slot struct {
	Id             *string
	Name           string
	ShiftId        string
	OrganizationId string
	Data           interface{}
}

type SlotRepository interface {
	GetById(id string) (*Slot, error)
	Create(slot *Slot) error
	Delete(id string) error
}

type SlotBoilerRepository struct{}

func (s SlotBoilerRepository) GetById(ctx context.Context, tx boil.ContextExecutor, id string) (*Slot, error) {
	slot, err := models.FindShiftSlot(ctx, tx, id)

	if err != nil {
		return nil, fmt.Errorf("getting slot by id: %w", err)
	}

	if slot == nil {
		return nil, errors.New("no slot found for id")
	}

	return &Slot{
		Id:      &slot.ID,
		Name:    slot.Name,
		ShiftId: slot.ShiftID,
	}, nil
}

func (s SlotBoilerRepository) Create(ctx context.Context, tx boil.ContextExecutor, slotDef *Slot) error {
	var slot models.ShiftSlot

	if slotDef == nil {
		return errors.New("missing slot definition")
	}

	var id string
	if slotDef.Id == nil {
		id = uuid.New().String()
	} else {
		id = *slotDef.Id
	}

	slot.ID = id
	slot.Name = slotDef.Name
	slot.ShiftID = slotDef.ShiftId
	slot.OrganizationID = slotDef.OrganizationId
	slot.Data.Marshal(slotDef.Data)

	if err := slot.Insert(ctx, tx, boil.Infer()); err != nil {
		return fmt.Errorf("inserting new shift slot: %w", err)
	}

	return nil
}

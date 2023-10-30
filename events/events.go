package events

import (
	"context"
	"database/sql"
	"time"

	"encore.app/db"
	"encore.app/db/models"
	"encore.app/users"
	"encore.dev/beta/auth"
	"encore.dev/storage/sqldb"
	"github.com/google/uuid"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"github.com/volatiletech/sqlboiler/v4/types"
)

type Event struct {
	ID         *string    `json:"id,omitempty" validate:"omitempty,uuid"`
	HappenedAt time.Time  `json:"happenedAt" validate:"required"`
	Type       string     `json:"type" validate:"required"`
	ScopeType  string     `json:"scopeType" validate:"required"`
	ScopeId    string     `json:"scopeId" validate:"required"`
	Data       types.JSON `json:"data" validate:"required"`
}
type EventPersisted struct {
	ID         string
	SequenceId int64
	InsertedAt time.Time
	Event
}

//encore:api private path=/events/new method=POST
func (s Service) NewEvent(ctx context.Context, event Event) (*EventPersisted, error) {
	orgId := auth.Data().(*users.UserData).OrgId

	e := &models.CoopEvent{
		OrganizationID: orgId,
		HappenedAt:     event.HappenedAt,
		Type:           event.Type,
		ScopeType:      event.ScopeType,
		ScopeID:        event.ScopeId,
		Data:           event.Data,
	}
	// need the ID upfront to be able to do the lookup after insert
	if event.ID != nil {
		e.ID = *event.ID
	} else {
		e.ID = uuid.New().String()
	}

	var newEvent *models.CoopEvent

	err := s.db.DoTx(ctx, nil, func(tx *sql.Tx) error {
		err := e.Insert(ctx, tx, boil.Infer())
		if (err) != nil {
			// TODO: check if error is unique primary key violation, confirm persisted
			// event matches input event data and continue, else return error
			// if (errors.As(err, &pq.Error{}) && err.(*pq.Error).Code == "23505") {}
			return err
		}

		newEvent, err = models.CoopEvents(qm.Where("id=?", e.ID)).One(ctx, tx)
		if err != nil {
			return err
		}

		if err := tx.Commit(); err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return &EventPersisted{
		ID:         newEvent.ID,
		SequenceId: newEvent.SequenceID,
		InsertedAt: newEvent.InsertedAt,
		Event:      event,
	}, nil
}

var coreDb = sqldb.Named("core").Stdlib()

//encore:service
type Service struct {
	db *db.DB
}

func initService() (*Service, error) {
	return &Service{db: db.New(coreDb)}, nil
}

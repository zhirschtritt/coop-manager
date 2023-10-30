package core

import (
	"context"
	"database/sql"
	_ "embed"
	"fmt"
	"time"

	"encore.app/db"
	"encore.app/db/models"
	"encore.dev"
	"encore.dev/storage/sqldb"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/types"
)

var secrets struct {
	ZitadelOrgId string
}

var coredb = sqldb.Named("core").Stdlib()

func init() {
	if encore.Meta().Environment.Cloud != encore.CloudLocal {
		return
	}

	ctx := context.Background()

	orgData := struct{ SomeData string }{SomeData: "foo"}
	var json = types.JSON{}
	json.Marshal(orgData)

	org := &models.Organization{
		ID:   secrets.ZitadelOrgId,
		Name: "Local Test Org",
		Data: json,
	}

	db := db.New(coredb)

	err := db.DoTx(ctx, nil, func(tx *sql.Tx) error {
		org.UpsertP(ctx, tx, true, []string{"id"}, boil.Infer(), boil.Infer())

		memberId := "0527df0e-b7ae-407e-a07c-778627a0e982"
		member := &models.Member{
			ID:             memberId,
			OrganizationID: org.ID,
			UserID:         "237295434412915826",
			FirstName:      "Test",
			LastName:       "User",
			Email:          "test@gmail.com",
		}
		member.UpsertP(ctx, tx, true, []string{"id"}, boil.Infer(), boil.Infer())

		shiftType := &models.ShiftType{
			ID:             "1cf203f6-1c79-407a-8d82-7aaab7dc0d7a",
			OrganizationID: org.ID,
			Name:           "Test Shift Type",
			Roles:          []string{"Staff"},
		}
		shiftType.UpsertP(ctx, tx, true, []string{"id"}, boil.Infer(), boil.Infer())

		shiftStart := time.Date(2023, 11, 17, 20, 0, 0, 0, time.UTC)
		shiftEnd := shiftStart.Add(3 * time.Hour)

		shift_1, shift_2 :=
			&models.Shift{
				OrganizationID: org.ID,
				ID:             "e537629d-b24a-4a40-a11b-3dee251253ed",
				StartAt:        shiftStart,
				EndAt:          shiftEnd,
				ShiftTypeID:    shiftType.ID,
			},
			&models.Shift{
				OrganizationID: org.ID,
				ID:             "989837fd-b558-400b-aabe-162842c7bc3f",
				StartAt:        shiftStart.Add(48 * time.Hour),
				EndAt:          shiftEnd.Add(48 * time.Hour),
				ShiftTypeID:    shiftType.ID,
			}

		shift_1.UpsertP(ctx, tx, true, []string{"id"}, boil.Infer(), boil.Infer())
		shift_2.UpsertP(ctx, tx, true, []string{"id"}, boil.Infer(), boil.Infer())

		return nil
	})

	if err != nil {
		panic(fmt.Errorf("failed to seed core db: %w", err))
	}
}

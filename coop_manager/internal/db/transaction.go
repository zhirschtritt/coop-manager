package db

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/volatiletech/sqlboiler/v4/boil"
)

/* The predetermined postgres row-level-security lock isolation key name */
const orgRowLockKey = "app.organization_id"

type InnerFn = func(tx boil.ContextExecutor) error

func RunInTxForOrg(
	ctx context.Context,
	txOptions *sql.TxOptions,
	organizationId string,
	fn InnerFn,
) error {
	return runInTransaction(ctx, txOptions, func(tx boil.ContextExecutor) error {
		// set tenant scope lock for current transaction
		if _, err := tx.Exec("set_config(?, ?, true)", orgRowLockKey, organizationId); err != nil {
			return err
		}

		return fn(tx)
	})
}

/* We should typically only use the `WithOrg` version of this helper */
func runInTransaction(
	ctx context.Context,
	txOptions *sql.TxOptions,
	fn func(tx boil.ContextExecutor) error,
) error {
	tx, err := boil.BeginTx(ctx, txOptions)
	if err != nil {
		return err
	}

	err = fn(tx)
	if err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit(); err != nil {
		// if the commit fails, try to rollback instead
		err = tx.Rollback()

		return fmt.Errorf("committing transaction: %w", err)
	}

	return nil
}

package db

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
)

//go:generate ./generate_models

type DB struct {
	*sql.DB
}

func New(db *sql.DB) *DB {
	return &DB{db}
}

func (db DB) DoTx(ctx context.Context, opts *sql.TxOptions, inner func(tx *sql.Tx) error) (finalErr error) {
	if opts == nil {
		opts = &sql.TxOptions{}
	}
	tx, finalErr := db.BeginTx(ctx, opts)
	if finalErr != nil {
		return
	}
	success := false
	defer func() {
		var err error
		var op string
		if !success {
			err = tx.Rollback()
			op = "Rollback"
		} else {
			err = tx.Commit()
			op = "Commit"
		}
		if err != nil {
			if errors.Is(err, sql.ErrTxDone) && (errors.Is(finalErr, context.Canceled) || errors.Is(finalErr, context.DeadlineExceeded)) {
				// leave finalErr as-is, ignore the sql error
			} else if finalErr == nil {
				finalErr = err
			} else {
				finalErr = fmt.Errorf("%s Failed: %s During: %w", op, err.Error(), finalErr)
			}
		}
	}()

	finalErr = inner(tx)
	if finalErr == nil {
		success = true
	}
	return
}

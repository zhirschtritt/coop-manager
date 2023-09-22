package db

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/kpango/glg"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/zhirschtritt/coop_manager/internal/db/migrations"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "coop_manager"
)

type DB struct {
	databaseName string
	sql          *sql.DB
}

func NewDatabaseConn(databaseName string) (*DB, error) {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname,
	)

	conn, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		return nil, err
	}
	boil.SetDB(conn)

	if err := conn.Ping(); err != nil {
		return nil, err
	}

	return &DB{
		databaseName: databaseName,
		sql:          conn,
	}, nil
}

func (db *DB) Close() error {
	if err := db.sql.Close(); err != nil {
		return fmt.Errorf("closing database connection: %w", err)
	}
	return nil
}

func (db *DB) Migrate(
	ctx context.Context,
	logger *glg.Glg,
) error {
	dr, err := postgres.WithInstance(db.sql, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("getting db driver for: %s: %w", dr, err)
	}

	sourceDriver, err := iofs.New(migrations.FS, "sql")
	if err != nil {
		return err
	}

	migrator, err := migrate.NewWithInstance("iofs", sourceDriver, db.databaseName, dr)
	if err != nil {
		return err
	}

	// check if any migrations are pending
	if err := migrator.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return fmt.Errorf("running migrations: %w", err)
	}

	logger.Debug("migrations complete")
	return nil
}

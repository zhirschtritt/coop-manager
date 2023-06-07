package db

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/volatiletech/sqlboiler/v4/boil"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "coop_manager"
)

type DB struct{}

func (*DB) Init() (*sql.DB, error) {
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
	return conn, nil
}

func InitDatabase() (*sql.DB, error) {
	db := &DB{}
	return db.Init()
}

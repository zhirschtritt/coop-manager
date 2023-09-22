package db

import (
	_ "github.com/volatiletech/sqlboiler/v4/boil"
)

// TODO: add these commands to magefile instead
//go:generate go run -mod=mod github.com/volatiletech/sqlboiler/v4 psql
//go:generate buf build

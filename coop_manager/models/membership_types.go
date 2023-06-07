// Code generated by SQLBoiler 4.14.2 (https://github.com/volatiletech/sqlboiler). DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package models

import (
	"context"
	"database/sql"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/friendsofgo/errors"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"github.com/volatiletech/sqlboiler/v4/queries/qmhelper"
	"github.com/volatiletech/strmangle"
)

// MembershipType is an object representing the database table.
type MembershipType struct {
	ID        string    `boil:"id" json:"id" toml:"id" yaml:"id"`
	CreatedAt time.Time `boil:"created_at" json:"created_at" toml:"created_at" yaml:"created_at"`
	Name      string    `boil:"name" json:"name" toml:"name" yaml:"name"`
	Level     string    `boil:"level" json:"level" toml:"level" yaml:"level"`

	R *membershipTypeR `boil:"-" json:"-" toml:"-" yaml:"-"`
	L membershipTypeL  `boil:"-" json:"-" toml:"-" yaml:"-"`
}

var MembershipTypeColumns = struct {
	ID        string
	CreatedAt string
	Name      string
	Level     string
}{
	ID:        "id",
	CreatedAt: "created_at",
	Name:      "name",
	Level:     "level",
}

var MembershipTypeTableColumns = struct {
	ID        string
	CreatedAt string
	Name      string
	Level     string
}{
	ID:        "membership_types.id",
	CreatedAt: "membership_types.created_at",
	Name:      "membership_types.name",
	Level:     "membership_types.level",
}

// Generated where

var MembershipTypeWhere = struct {
	ID        whereHelperstring
	CreatedAt whereHelpertime_Time
	Name      whereHelperstring
	Level     whereHelperstring
}{
	ID:        whereHelperstring{field: "\"membership_types\".\"id\""},
	CreatedAt: whereHelpertime_Time{field: "\"membership_types\".\"created_at\""},
	Name:      whereHelperstring{field: "\"membership_types\".\"name\""},
	Level:     whereHelperstring{field: "\"membership_types\".\"level\""},
}

// MembershipTypeRels is where relationship names are stored.
var MembershipTypeRels = struct {
	Memberships string
}{
	Memberships: "Memberships",
}

// membershipTypeR is where relationships are stored.
type membershipTypeR struct {
	Memberships MembershipSlice `boil:"Memberships" json:"Memberships" toml:"Memberships" yaml:"Memberships"`
}

// NewStruct creates a new relationship struct
func (*membershipTypeR) NewStruct() *membershipTypeR {
	return &membershipTypeR{}
}

func (r *membershipTypeR) GetMemberships() MembershipSlice {
	if r == nil {
		return nil
	}
	return r.Memberships
}

// membershipTypeL is where Load methods for each relationship are stored.
type membershipTypeL struct{}

var (
	membershipTypeAllColumns            = []string{"id", "created_at", "name", "level"}
	membershipTypeColumnsWithoutDefault = []string{"name", "level"}
	membershipTypeColumnsWithDefault    = []string{"id", "created_at"}
	membershipTypePrimaryKeyColumns     = []string{"id"}
	membershipTypeGeneratedColumns      = []string{}
)

type (
	// MembershipTypeSlice is an alias for a slice of pointers to MembershipType.
	// This should almost always be used instead of []MembershipType.
	MembershipTypeSlice []*MembershipType
	// MembershipTypeHook is the signature for custom MembershipType hook methods
	MembershipTypeHook func(context.Context, boil.ContextExecutor, *MembershipType) error

	membershipTypeQuery struct {
		*queries.Query
	}
)

// Cache for insert, update and upsert
var (
	membershipTypeType                 = reflect.TypeOf(&MembershipType{})
	membershipTypeMapping              = queries.MakeStructMapping(membershipTypeType)
	membershipTypePrimaryKeyMapping, _ = queries.BindMapping(membershipTypeType, membershipTypeMapping, membershipTypePrimaryKeyColumns)
	membershipTypeInsertCacheMut       sync.RWMutex
	membershipTypeInsertCache          = make(map[string]insertCache)
	membershipTypeUpdateCacheMut       sync.RWMutex
	membershipTypeUpdateCache          = make(map[string]updateCache)
	membershipTypeUpsertCacheMut       sync.RWMutex
	membershipTypeUpsertCache          = make(map[string]insertCache)
)

var (
	// Force time package dependency for automated UpdatedAt/CreatedAt.
	_ = time.Second
	// Force qmhelper dependency for where clause generation (which doesn't
	// always happen)
	_ = qmhelper.Where
)

var membershipTypeAfterSelectHooks []MembershipTypeHook

var membershipTypeBeforeInsertHooks []MembershipTypeHook
var membershipTypeAfterInsertHooks []MembershipTypeHook

var membershipTypeBeforeUpdateHooks []MembershipTypeHook
var membershipTypeAfterUpdateHooks []MembershipTypeHook

var membershipTypeBeforeDeleteHooks []MembershipTypeHook
var membershipTypeAfterDeleteHooks []MembershipTypeHook

var membershipTypeBeforeUpsertHooks []MembershipTypeHook
var membershipTypeAfterUpsertHooks []MembershipTypeHook

// doAfterSelectHooks executes all "after Select" hooks.
func (o *MembershipType) doAfterSelectHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeAfterSelectHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeInsertHooks executes all "before insert" hooks.
func (o *MembershipType) doBeforeInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeBeforeInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterInsertHooks executes all "after Insert" hooks.
func (o *MembershipType) doAfterInsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeAfterInsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpdateHooks executes all "before Update" hooks.
func (o *MembershipType) doBeforeUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeBeforeUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpdateHooks executes all "after Update" hooks.
func (o *MembershipType) doAfterUpdateHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeAfterUpdateHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeDeleteHooks executes all "before Delete" hooks.
func (o *MembershipType) doBeforeDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeBeforeDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterDeleteHooks executes all "after Delete" hooks.
func (o *MembershipType) doAfterDeleteHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeAfterDeleteHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doBeforeUpsertHooks executes all "before Upsert" hooks.
func (o *MembershipType) doBeforeUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeBeforeUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// doAfterUpsertHooks executes all "after Upsert" hooks.
func (o *MembershipType) doAfterUpsertHooks(ctx context.Context, exec boil.ContextExecutor) (err error) {
	if boil.HooksAreSkipped(ctx) {
		return nil
	}

	for _, hook := range membershipTypeAfterUpsertHooks {
		if err := hook(ctx, exec, o); err != nil {
			return err
		}
	}

	return nil
}

// AddMembershipTypeHook registers your hook function for all future operations.
func AddMembershipTypeHook(hookPoint boil.HookPoint, membershipTypeHook MembershipTypeHook) {
	switch hookPoint {
	case boil.AfterSelectHook:
		membershipTypeAfterSelectHooks = append(membershipTypeAfterSelectHooks, membershipTypeHook)
	case boil.BeforeInsertHook:
		membershipTypeBeforeInsertHooks = append(membershipTypeBeforeInsertHooks, membershipTypeHook)
	case boil.AfterInsertHook:
		membershipTypeAfterInsertHooks = append(membershipTypeAfterInsertHooks, membershipTypeHook)
	case boil.BeforeUpdateHook:
		membershipTypeBeforeUpdateHooks = append(membershipTypeBeforeUpdateHooks, membershipTypeHook)
	case boil.AfterUpdateHook:
		membershipTypeAfterUpdateHooks = append(membershipTypeAfterUpdateHooks, membershipTypeHook)
	case boil.BeforeDeleteHook:
		membershipTypeBeforeDeleteHooks = append(membershipTypeBeforeDeleteHooks, membershipTypeHook)
	case boil.AfterDeleteHook:
		membershipTypeAfterDeleteHooks = append(membershipTypeAfterDeleteHooks, membershipTypeHook)
	case boil.BeforeUpsertHook:
		membershipTypeBeforeUpsertHooks = append(membershipTypeBeforeUpsertHooks, membershipTypeHook)
	case boil.AfterUpsertHook:
		membershipTypeAfterUpsertHooks = append(membershipTypeAfterUpsertHooks, membershipTypeHook)
	}
}

// OneG returns a single membershipType record from the query using the global executor.
func (q membershipTypeQuery) OneG(ctx context.Context) (*MembershipType, error) {
	return q.One(ctx, boil.GetContextDB())
}

// One returns a single membershipType record from the query.
func (q membershipTypeQuery) One(ctx context.Context, exec boil.ContextExecutor) (*MembershipType, error) {
	o := &MembershipType{}

	queries.SetLimit(q.Query, 1)

	err := q.Bind(ctx, exec, o)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "models: failed to execute a one query for membership_types")
	}

	if err := o.doAfterSelectHooks(ctx, exec); err != nil {
		return o, err
	}

	return o, nil
}

// AllG returns all MembershipType records from the query using the global executor.
func (q membershipTypeQuery) AllG(ctx context.Context) (MembershipTypeSlice, error) {
	return q.All(ctx, boil.GetContextDB())
}

// All returns all MembershipType records from the query.
func (q membershipTypeQuery) All(ctx context.Context, exec boil.ContextExecutor) (MembershipTypeSlice, error) {
	var o []*MembershipType

	err := q.Bind(ctx, exec, &o)
	if err != nil {
		return nil, errors.Wrap(err, "models: failed to assign all query results to MembershipType slice")
	}

	if len(membershipTypeAfterSelectHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterSelectHooks(ctx, exec); err != nil {
				return o, err
			}
		}
	}

	return o, nil
}

// CountG returns the count of all MembershipType records in the query using the global executor
func (q membershipTypeQuery) CountG(ctx context.Context) (int64, error) {
	return q.Count(ctx, boil.GetContextDB())
}

// Count returns the count of all MembershipType records in the query.
func (q membershipTypeQuery) Count(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to count membership_types rows")
	}

	return count, nil
}

// ExistsG checks if the row exists in the table using the global executor.
func (q membershipTypeQuery) ExistsG(ctx context.Context) (bool, error) {
	return q.Exists(ctx, boil.GetContextDB())
}

// Exists checks if the row exists in the table.
func (q membershipTypeQuery) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	var count int64

	queries.SetSelect(q.Query, nil)
	queries.SetCount(q.Query)
	queries.SetLimit(q.Query, 1)

	err := q.Query.QueryRowContext(ctx, exec).Scan(&count)
	if err != nil {
		return false, errors.Wrap(err, "models: failed to check if membership_types exists")
	}

	return count > 0, nil
}

// Memberships retrieves all the membership's Memberships with an executor.
func (o *MembershipType) Memberships(mods ...qm.QueryMod) membershipQuery {
	var queryMods []qm.QueryMod
	if len(mods) != 0 {
		queryMods = append(queryMods, mods...)
	}

	queryMods = append(queryMods,
		qm.Where("\"memberships\".\"membership_type_id\"=?", o.ID),
	)

	return Memberships(queryMods...)
}

// LoadMemberships allows an eager lookup of values, cached into the
// loaded structs of the objects. This is for a 1-M or N-M relationship.
func (membershipTypeL) LoadMemberships(ctx context.Context, e boil.ContextExecutor, singular bool, maybeMembershipType interface{}, mods queries.Applicator) error {
	var slice []*MembershipType
	var object *MembershipType

	if singular {
		var ok bool
		object, ok = maybeMembershipType.(*MembershipType)
		if !ok {
			object = new(MembershipType)
			ok = queries.SetFromEmbeddedStruct(&object, &maybeMembershipType)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", object, maybeMembershipType))
			}
		}
	} else {
		s, ok := maybeMembershipType.(*[]*MembershipType)
		if ok {
			slice = *s
		} else {
			ok = queries.SetFromEmbeddedStruct(&slice, maybeMembershipType)
			if !ok {
				return errors.New(fmt.Sprintf("failed to set %T from embedded struct %T", slice, maybeMembershipType))
			}
		}
	}

	args := make([]interface{}, 0, 1)
	if singular {
		if object.R == nil {
			object.R = &membershipTypeR{}
		}
		args = append(args, object.ID)
	} else {
	Outer:
		for _, obj := range slice {
			if obj.R == nil {
				obj.R = &membershipTypeR{}
			}

			for _, a := range args {
				if a == obj.ID {
					continue Outer
				}
			}

			args = append(args, obj.ID)
		}
	}

	if len(args) == 0 {
		return nil
	}

	query := NewQuery(
		qm.From(`memberships`),
		qm.WhereIn(`memberships.membership_type_id in ?`, args...),
	)
	if mods != nil {
		mods.Apply(query)
	}

	results, err := query.QueryContext(ctx, e)
	if err != nil {
		return errors.Wrap(err, "failed to eager load memberships")
	}

	var resultSlice []*Membership
	if err = queries.Bind(results, &resultSlice); err != nil {
		return errors.Wrap(err, "failed to bind eager loaded slice memberships")
	}

	if err = results.Close(); err != nil {
		return errors.Wrap(err, "failed to close results in eager load on memberships")
	}
	if err = results.Err(); err != nil {
		return errors.Wrap(err, "error occurred during iteration of eager loaded relations for memberships")
	}

	if len(membershipAfterSelectHooks) != 0 {
		for _, obj := range resultSlice {
			if err := obj.doAfterSelectHooks(ctx, e); err != nil {
				return err
			}
		}
	}
	if singular {
		object.R.Memberships = resultSlice
		for _, foreign := range resultSlice {
			if foreign.R == nil {
				foreign.R = &membershipR{}
			}
			foreign.R.MembershipType = object
		}
		return nil
	}

	for _, foreign := range resultSlice {
		for _, local := range slice {
			if local.ID == foreign.MembershipTypeID {
				local.R.Memberships = append(local.R.Memberships, foreign)
				if foreign.R == nil {
					foreign.R = &membershipR{}
				}
				foreign.R.MembershipType = local
				break
			}
		}
	}

	return nil
}

// AddMembershipsG adds the given related objects to the existing relationships
// of the membership_type, optionally inserting them as new records.
// Appends related to o.R.Memberships.
// Sets related.R.MembershipType appropriately.
// Uses the global database handle.
func (o *MembershipType) AddMembershipsG(ctx context.Context, insert bool, related ...*Membership) error {
	return o.AddMemberships(ctx, boil.GetContextDB(), insert, related...)
}

// AddMemberships adds the given related objects to the existing relationships
// of the membership_type, optionally inserting them as new records.
// Appends related to o.R.Memberships.
// Sets related.R.MembershipType appropriately.
func (o *MembershipType) AddMemberships(ctx context.Context, exec boil.ContextExecutor, insert bool, related ...*Membership) error {
	var err error
	for _, rel := range related {
		if insert {
			rel.MembershipTypeID = o.ID
			if err = rel.Insert(ctx, exec, boil.Infer()); err != nil {
				return errors.Wrap(err, "failed to insert into foreign table")
			}
		} else {
			updateQuery := fmt.Sprintf(
				"UPDATE \"memberships\" SET %s WHERE %s",
				strmangle.SetParamNames("\"", "\"", 1, []string{"membership_type_id"}),
				strmangle.WhereClause("\"", "\"", 2, membershipPrimaryKeyColumns),
			)
			values := []interface{}{o.ID, rel.ID}

			if boil.IsDebug(ctx) {
				writer := boil.DebugWriterFrom(ctx)
				fmt.Fprintln(writer, updateQuery)
				fmt.Fprintln(writer, values)
			}
			if _, err = exec.ExecContext(ctx, updateQuery, values...); err != nil {
				return errors.Wrap(err, "failed to update foreign table")
			}

			rel.MembershipTypeID = o.ID
		}
	}

	if o.R == nil {
		o.R = &membershipTypeR{
			Memberships: related,
		}
	} else {
		o.R.Memberships = append(o.R.Memberships, related...)
	}

	for _, rel := range related {
		if rel.R == nil {
			rel.R = &membershipR{
				MembershipType: o,
			}
		} else {
			rel.R.MembershipType = o
		}
	}
	return nil
}

// MembershipTypes retrieves all the records using an executor.
func MembershipTypes(mods ...qm.QueryMod) membershipTypeQuery {
	mods = append(mods, qm.From("\"membership_types\""))
	q := NewQuery(mods...)
	if len(queries.GetSelect(q)) == 0 {
		queries.SetSelect(q, []string{"\"membership_types\".*"})
	}

	return membershipTypeQuery{q}
}

// FindMembershipTypeG retrieves a single record by ID.
func FindMembershipTypeG(ctx context.Context, iD string, selectCols ...string) (*MembershipType, error) {
	return FindMembershipType(ctx, boil.GetContextDB(), iD, selectCols...)
}

// FindMembershipType retrieves a single record by ID with an executor.
// If selectCols is empty Find will return all columns.
func FindMembershipType(ctx context.Context, exec boil.ContextExecutor, iD string, selectCols ...string) (*MembershipType, error) {
	membershipTypeObj := &MembershipType{}

	sel := "*"
	if len(selectCols) > 0 {
		sel = strings.Join(strmangle.IdentQuoteSlice(dialect.LQ, dialect.RQ, selectCols), ",")
	}
	query := fmt.Sprintf(
		"select %s from \"membership_types\" where \"id\"=$1", sel,
	)

	q := queries.Raw(query, iD)

	err := q.Bind(ctx, exec, membershipTypeObj)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, sql.ErrNoRows
		}
		return nil, errors.Wrap(err, "models: unable to select from membership_types")
	}

	if err = membershipTypeObj.doAfterSelectHooks(ctx, exec); err != nil {
		return membershipTypeObj, err
	}

	return membershipTypeObj, nil
}

// InsertG a single record. See Insert for whitelist behavior description.
func (o *MembershipType) InsertG(ctx context.Context, columns boil.Columns) error {
	return o.Insert(ctx, boil.GetContextDB(), columns)
}

// Insert a single record using an executor.
// See boil.Columns.InsertColumnSet documentation to understand column list inference for inserts.
func (o *MembershipType) Insert(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) error {
	if o == nil {
		return errors.New("models: no membership_types provided for insertion")
	}

	var err error
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		if o.CreatedAt.IsZero() {
			o.CreatedAt = currTime
		}
	}

	if err := o.doBeforeInsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(membershipTypeColumnsWithDefault, o)

	key := makeCacheKey(columns, nzDefaults)
	membershipTypeInsertCacheMut.RLock()
	cache, cached := membershipTypeInsertCache[key]
	membershipTypeInsertCacheMut.RUnlock()

	if !cached {
		wl, returnColumns := columns.InsertColumnSet(
			membershipTypeAllColumns,
			membershipTypeColumnsWithDefault,
			membershipTypeColumnsWithoutDefault,
			nzDefaults,
		)

		cache.valueMapping, err = queries.BindMapping(membershipTypeType, membershipTypeMapping, wl)
		if err != nil {
			return err
		}
		cache.retMapping, err = queries.BindMapping(membershipTypeType, membershipTypeMapping, returnColumns)
		if err != nil {
			return err
		}
		if len(wl) != 0 {
			cache.query = fmt.Sprintf("INSERT INTO \"membership_types\" (\"%s\") %%sVALUES (%s)%%s", strings.Join(wl, "\",\""), strmangle.Placeholders(dialect.UseIndexPlaceholders, len(wl), 1, 1))
		} else {
			cache.query = "INSERT INTO \"membership_types\" %sDEFAULT VALUES%s"
		}

		var queryOutput, queryReturning string

		if len(cache.retMapping) != 0 {
			queryReturning = fmt.Sprintf(" RETURNING \"%s\"", strings.Join(returnColumns, "\",\""))
		}

		cache.query = fmt.Sprintf(cache.query, queryOutput, queryReturning)
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}

	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(queries.PtrsFromMapping(value, cache.retMapping)...)
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}

	if err != nil {
		return errors.Wrap(err, "models: unable to insert into membership_types")
	}

	if !cached {
		membershipTypeInsertCacheMut.Lock()
		membershipTypeInsertCache[key] = cache
		membershipTypeInsertCacheMut.Unlock()
	}

	return o.doAfterInsertHooks(ctx, exec)
}

// UpdateG a single MembershipType record using the global executor.
// See Update for more documentation.
func (o *MembershipType) UpdateG(ctx context.Context, columns boil.Columns) (int64, error) {
	return o.Update(ctx, boil.GetContextDB(), columns)
}

// Update uses an executor to update the MembershipType.
// See boil.Columns.UpdateColumnSet documentation to understand column list inference for updates.
// Update does not automatically update the record in case of default values. Use .Reload() to refresh the records.
func (o *MembershipType) Update(ctx context.Context, exec boil.ContextExecutor, columns boil.Columns) (int64, error) {
	var err error
	if err = o.doBeforeUpdateHooks(ctx, exec); err != nil {
		return 0, err
	}
	key := makeCacheKey(columns, nil)
	membershipTypeUpdateCacheMut.RLock()
	cache, cached := membershipTypeUpdateCache[key]
	membershipTypeUpdateCacheMut.RUnlock()

	if !cached {
		wl := columns.UpdateColumnSet(
			membershipTypeAllColumns,
			membershipTypePrimaryKeyColumns,
		)

		if !columns.IsWhitelist() {
			wl = strmangle.SetComplement(wl, []string{"created_at"})
		}
		if len(wl) == 0 {
			return 0, errors.New("models: unable to update membership_types, could not build whitelist")
		}

		cache.query = fmt.Sprintf("UPDATE \"membership_types\" SET %s WHERE %s",
			strmangle.SetParamNames("\"", "\"", 1, wl),
			strmangle.WhereClause("\"", "\"", len(wl)+1, membershipTypePrimaryKeyColumns),
		)
		cache.valueMapping, err = queries.BindMapping(membershipTypeType, membershipTypeMapping, append(wl, membershipTypePrimaryKeyColumns...))
		if err != nil {
			return 0, err
		}
	}

	values := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), cache.valueMapping)

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, values)
	}
	var result sql.Result
	result, err = exec.ExecContext(ctx, cache.query, values...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to update membership_types row")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by update for membership_types")
	}

	if !cached {
		membershipTypeUpdateCacheMut.Lock()
		membershipTypeUpdateCache[key] = cache
		membershipTypeUpdateCacheMut.Unlock()
	}

	return rowsAff, o.doAfterUpdateHooks(ctx, exec)
}

// UpdateAllG updates all rows with the specified column values.
func (q membershipTypeQuery) UpdateAllG(ctx context.Context, cols M) (int64, error) {
	return q.UpdateAll(ctx, boil.GetContextDB(), cols)
}

// UpdateAll updates all rows with the specified column values.
func (q membershipTypeQuery) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	queries.SetUpdate(q.Query, cols)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to update all for membership_types")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to retrieve rows affected for membership_types")
	}

	return rowsAff, nil
}

// UpdateAllG updates all rows with the specified column values.
func (o MembershipTypeSlice) UpdateAllG(ctx context.Context, cols M) (int64, error) {
	return o.UpdateAll(ctx, boil.GetContextDB(), cols)
}

// UpdateAll updates all rows with the specified column values, using an executor.
func (o MembershipTypeSlice) UpdateAll(ctx context.Context, exec boil.ContextExecutor, cols M) (int64, error) {
	ln := int64(len(o))
	if ln == 0 {
		return 0, nil
	}

	if len(cols) == 0 {
		return 0, errors.New("models: update all requires at least one column argument")
	}

	colNames := make([]string, len(cols))
	args := make([]interface{}, len(cols))

	i := 0
	for name, value := range cols {
		colNames[i] = name
		args[i] = value
		i++
	}

	// Append all of the primary key values for each column
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), membershipTypePrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := fmt.Sprintf("UPDATE \"membership_types\" SET %s WHERE %s",
		strmangle.SetParamNames("\"", "\"", 1, colNames),
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), len(colNames)+1, membershipTypePrimaryKeyColumns, len(o)))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to update all in membershipType slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to retrieve rows affected all in update all membershipType")
	}
	return rowsAff, nil
}

// UpsertG attempts an insert, and does an update or ignore on conflict.
func (o *MembershipType) UpsertG(ctx context.Context, updateOnConflict bool, conflictColumns []string, updateColumns, insertColumns boil.Columns) error {
	return o.Upsert(ctx, boil.GetContextDB(), updateOnConflict, conflictColumns, updateColumns, insertColumns)
}

// Upsert attempts an insert using an executor, and does an update or ignore on conflict.
// See boil.Columns documentation for how to properly use updateColumns and insertColumns.
func (o *MembershipType) Upsert(ctx context.Context, exec boil.ContextExecutor, updateOnConflict bool, conflictColumns []string, updateColumns, insertColumns boil.Columns) error {
	if o == nil {
		return errors.New("models: no membership_types provided for upsert")
	}
	if !boil.TimestampsAreSkipped(ctx) {
		currTime := time.Now().In(boil.GetLocation())

		if o.CreatedAt.IsZero() {
			o.CreatedAt = currTime
		}
	}

	if err := o.doBeforeUpsertHooks(ctx, exec); err != nil {
		return err
	}

	nzDefaults := queries.NonZeroDefaultSet(membershipTypeColumnsWithDefault, o)

	// Build cache key in-line uglily - mysql vs psql problems
	buf := strmangle.GetBuffer()
	if updateOnConflict {
		buf.WriteByte('t')
	} else {
		buf.WriteByte('f')
	}
	buf.WriteByte('.')
	for _, c := range conflictColumns {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(updateColumns.Kind))
	for _, c := range updateColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	buf.WriteString(strconv.Itoa(insertColumns.Kind))
	for _, c := range insertColumns.Cols {
		buf.WriteString(c)
	}
	buf.WriteByte('.')
	for _, c := range nzDefaults {
		buf.WriteString(c)
	}
	key := buf.String()
	strmangle.PutBuffer(buf)

	membershipTypeUpsertCacheMut.RLock()
	cache, cached := membershipTypeUpsertCache[key]
	membershipTypeUpsertCacheMut.RUnlock()

	var err error

	if !cached {
		insert, ret := insertColumns.InsertColumnSet(
			membershipTypeAllColumns,
			membershipTypeColumnsWithDefault,
			membershipTypeColumnsWithoutDefault,
			nzDefaults,
		)

		update := updateColumns.UpdateColumnSet(
			membershipTypeAllColumns,
			membershipTypePrimaryKeyColumns,
		)

		if updateOnConflict && len(update) == 0 {
			return errors.New("models: unable to upsert membership_types, could not build update column list")
		}

		conflict := conflictColumns
		if len(conflict) == 0 {
			conflict = make([]string, len(membershipTypePrimaryKeyColumns))
			copy(conflict, membershipTypePrimaryKeyColumns)
		}
		cache.query = buildUpsertQueryPostgres(dialect, "\"membership_types\"", updateOnConflict, ret, update, conflict, insert)

		cache.valueMapping, err = queries.BindMapping(membershipTypeType, membershipTypeMapping, insert)
		if err != nil {
			return err
		}
		if len(ret) != 0 {
			cache.retMapping, err = queries.BindMapping(membershipTypeType, membershipTypeMapping, ret)
			if err != nil {
				return err
			}
		}
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	vals := queries.ValuesFromMapping(value, cache.valueMapping)
	var returns []interface{}
	if len(cache.retMapping) != 0 {
		returns = queries.PtrsFromMapping(value, cache.retMapping)
	}

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, cache.query)
		fmt.Fprintln(writer, vals)
	}
	if len(cache.retMapping) != 0 {
		err = exec.QueryRowContext(ctx, cache.query, vals...).Scan(returns...)
		if errors.Is(err, sql.ErrNoRows) {
			err = nil // Postgres doesn't return anything when there's no update
		}
	} else {
		_, err = exec.ExecContext(ctx, cache.query, vals...)
	}
	if err != nil {
		return errors.Wrap(err, "models: unable to upsert membership_types")
	}

	if !cached {
		membershipTypeUpsertCacheMut.Lock()
		membershipTypeUpsertCache[key] = cache
		membershipTypeUpsertCacheMut.Unlock()
	}

	return o.doAfterUpsertHooks(ctx, exec)
}

// DeleteG deletes a single MembershipType record.
// DeleteG will match against the primary key column to find the record to delete.
func (o *MembershipType) DeleteG(ctx context.Context) (int64, error) {
	return o.Delete(ctx, boil.GetContextDB())
}

// Delete deletes a single MembershipType record with an executor.
// Delete will match against the primary key column to find the record to delete.
func (o *MembershipType) Delete(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if o == nil {
		return 0, errors.New("models: no MembershipType provided for delete")
	}

	if err := o.doBeforeDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	args := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(o)), membershipTypePrimaryKeyMapping)
	sql := "DELETE FROM \"membership_types\" WHERE \"id\"=$1"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args...)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to delete from membership_types")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by delete for membership_types")
	}

	if err := o.doAfterDeleteHooks(ctx, exec); err != nil {
		return 0, err
	}

	return rowsAff, nil
}

func (q membershipTypeQuery) DeleteAllG(ctx context.Context) (int64, error) {
	return q.DeleteAll(ctx, boil.GetContextDB())
}

// DeleteAll deletes all matching rows.
func (q membershipTypeQuery) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if q.Query == nil {
		return 0, errors.New("models: no membershipTypeQuery provided for delete all")
	}

	queries.SetDelete(q.Query)

	result, err := q.Query.ExecContext(ctx, exec)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to delete all from membership_types")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by deleteall for membership_types")
	}

	return rowsAff, nil
}

// DeleteAllG deletes all rows in the slice.
func (o MembershipTypeSlice) DeleteAllG(ctx context.Context) (int64, error) {
	return o.DeleteAll(ctx, boil.GetContextDB())
}

// DeleteAll deletes all rows in the slice, using an executor.
func (o MembershipTypeSlice) DeleteAll(ctx context.Context, exec boil.ContextExecutor) (int64, error) {
	if len(o) == 0 {
		return 0, nil
	}

	if len(membershipTypeBeforeDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doBeforeDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	var args []interface{}
	for _, obj := range o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), membershipTypePrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "DELETE FROM \"membership_types\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, membershipTypePrimaryKeyColumns, len(o))

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, args)
	}
	result, err := exec.ExecContext(ctx, sql, args...)
	if err != nil {
		return 0, errors.Wrap(err, "models: unable to delete all from membershipType slice")
	}

	rowsAff, err := result.RowsAffected()
	if err != nil {
		return 0, errors.Wrap(err, "models: failed to get rows affected by deleteall for membership_types")
	}

	if len(membershipTypeAfterDeleteHooks) != 0 {
		for _, obj := range o {
			if err := obj.doAfterDeleteHooks(ctx, exec); err != nil {
				return 0, err
			}
		}
	}

	return rowsAff, nil
}

// ReloadG refetches the object from the database using the primary keys.
func (o *MembershipType) ReloadG(ctx context.Context) error {
	if o == nil {
		return errors.New("models: no MembershipType provided for reload")
	}

	return o.Reload(ctx, boil.GetContextDB())
}

// Reload refetches the object from the database
// using the primary keys with an executor.
func (o *MembershipType) Reload(ctx context.Context, exec boil.ContextExecutor) error {
	ret, err := FindMembershipType(ctx, exec, o.ID)
	if err != nil {
		return err
	}

	*o = *ret
	return nil
}

// ReloadAllG refetches every row with matching primary key column values
// and overwrites the original object slice with the newly updated slice.
func (o *MembershipTypeSlice) ReloadAllG(ctx context.Context) error {
	if o == nil {
		return errors.New("models: empty MembershipTypeSlice provided for reload all")
	}

	return o.ReloadAll(ctx, boil.GetContextDB())
}

// ReloadAll refetches every row with matching primary key column values
// and overwrites the original object slice with the newly updated slice.
func (o *MembershipTypeSlice) ReloadAll(ctx context.Context, exec boil.ContextExecutor) error {
	if o == nil || len(*o) == 0 {
		return nil
	}

	slice := MembershipTypeSlice{}
	var args []interface{}
	for _, obj := range *o {
		pkeyArgs := queries.ValuesFromMapping(reflect.Indirect(reflect.ValueOf(obj)), membershipTypePrimaryKeyMapping)
		args = append(args, pkeyArgs...)
	}

	sql := "SELECT \"membership_types\".* FROM \"membership_types\" WHERE " +
		strmangle.WhereClauseRepeated(string(dialect.LQ), string(dialect.RQ), 1, membershipTypePrimaryKeyColumns, len(*o))

	q := queries.Raw(sql, args...)

	err := q.Bind(ctx, exec, &slice)
	if err != nil {
		return errors.Wrap(err, "models: unable to reload all in MembershipTypeSlice")
	}

	*o = slice

	return nil
}

// MembershipTypeExistsG checks if the MembershipType row exists.
func MembershipTypeExistsG(ctx context.Context, iD string) (bool, error) {
	return MembershipTypeExists(ctx, boil.GetContextDB(), iD)
}

// MembershipTypeExists checks if the MembershipType row exists.
func MembershipTypeExists(ctx context.Context, exec boil.ContextExecutor, iD string) (bool, error) {
	var exists bool
	sql := "select exists(select 1 from \"membership_types\" where \"id\"=$1 limit 1)"

	if boil.IsDebug(ctx) {
		writer := boil.DebugWriterFrom(ctx)
		fmt.Fprintln(writer, sql)
		fmt.Fprintln(writer, iD)
	}
	row := exec.QueryRowContext(ctx, sql, iD)

	err := row.Scan(&exists)
	if err != nil {
		return false, errors.Wrap(err, "models: unable to check if membership_types exists")
	}

	return exists, nil
}

// Exists checks if the MembershipType row exists.
func (o *MembershipType) Exists(ctx context.Context, exec boil.ContextExecutor) (bool, error) {
	return MembershipTypeExists(ctx, exec, o.ID)
}

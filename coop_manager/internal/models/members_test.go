// Code generated by SQLBoiler 4.14.2 (https://github.com/volatiletech/sqlboiler). DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package models

import (
	"bytes"
	"context"
	"reflect"
	"testing"

	"github.com/volatiletech/randomize"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries"
	"github.com/volatiletech/strmangle"
)

var (
	// Relationships sometimes use the reflection helper queries.Equal/queries.Assign
	// so force a package dependency in case they don't.
	_ = queries.Equal
)

func testMembers(t *testing.T) {
	t.Parallel()

	query := Members()

	if query.Query == nil {
		t.Error("expected a query, got nothing")
	}
}

func testMembersDelete(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if rowsAff, err := o.Delete(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testMembersQueryDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if rowsAff, err := Members().DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testMembersSliceDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := MemberSlice{o}

	if rowsAff, err := slice.DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testMembersExists(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	e, err := MemberExists(ctx, tx, o.ID)
	if err != nil {
		t.Errorf("Unable to check if Member exists: %s", err)
	}
	if !e {
		t.Errorf("Expected MemberExists to return true, but got false.")
	}
}

func testMembersFind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	memberFound, err := FindMember(ctx, tx, o.ID)
	if err != nil {
		t.Error(err)
	}

	if memberFound == nil {
		t.Error("want a record, got nil")
	}
}

func testMembersBind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if err = Members().Bind(ctx, tx, o); err != nil {
		t.Error(err)
	}
}

func testMembersOne(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if x, err := Members().One(ctx, tx); err != nil {
		t.Error(err)
	} else if x == nil {
		t.Error("expected to get a non nil record")
	}
}

func testMembersAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	memberOne := &Member{}
	memberTwo := &Member{}
	if err = randomize.Struct(seed, memberOne, memberDBTypes, false, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}
	if err = randomize.Struct(seed, memberTwo, memberDBTypes, false, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = memberOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = memberTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := Members().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 2 {
		t.Error("want 2 records, got:", len(slice))
	}
}

func testMembersCount(t *testing.T) {
	t.Parallel()

	var err error
	seed := randomize.NewSeed()
	memberOne := &Member{}
	memberTwo := &Member{}
	if err = randomize.Struct(seed, memberOne, memberDBTypes, false, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}
	if err = randomize.Struct(seed, memberTwo, memberDBTypes, false, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = memberOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = memberTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 2 {
		t.Error("want 2 records, got:", count)
	}
}

func memberBeforeInsertHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberAfterInsertHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberAfterSelectHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberBeforeUpdateHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberAfterUpdateHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberBeforeDeleteHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberAfterDeleteHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberBeforeUpsertHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func memberAfterUpsertHook(ctx context.Context, e boil.ContextExecutor, o *Member) error {
	*o = Member{}
	return nil
}

func testMembersHooks(t *testing.T) {
	t.Parallel()

	var err error

	ctx := context.Background()
	empty := &Member{}
	o := &Member{}

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, o, memberDBTypes, false); err != nil {
		t.Errorf("Unable to randomize Member object: %s", err)
	}

	AddMemberHook(boil.BeforeInsertHook, memberBeforeInsertHook)
	if err = o.doBeforeInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeInsertHook function to empty object, but got: %#v", o)
	}
	memberBeforeInsertHooks = []MemberHook{}

	AddMemberHook(boil.AfterInsertHook, memberAfterInsertHook)
	if err = o.doAfterInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterInsertHook function to empty object, but got: %#v", o)
	}
	memberAfterInsertHooks = []MemberHook{}

	AddMemberHook(boil.AfterSelectHook, memberAfterSelectHook)
	if err = o.doAfterSelectHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterSelectHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterSelectHook function to empty object, but got: %#v", o)
	}
	memberAfterSelectHooks = []MemberHook{}

	AddMemberHook(boil.BeforeUpdateHook, memberBeforeUpdateHook)
	if err = o.doBeforeUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpdateHook function to empty object, but got: %#v", o)
	}
	memberBeforeUpdateHooks = []MemberHook{}

	AddMemberHook(boil.AfterUpdateHook, memberAfterUpdateHook)
	if err = o.doAfterUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpdateHook function to empty object, but got: %#v", o)
	}
	memberAfterUpdateHooks = []MemberHook{}

	AddMemberHook(boil.BeforeDeleteHook, memberBeforeDeleteHook)
	if err = o.doBeforeDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeDeleteHook function to empty object, but got: %#v", o)
	}
	memberBeforeDeleteHooks = []MemberHook{}

	AddMemberHook(boil.AfterDeleteHook, memberAfterDeleteHook)
	if err = o.doAfterDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterDeleteHook function to empty object, but got: %#v", o)
	}
	memberAfterDeleteHooks = []MemberHook{}

	AddMemberHook(boil.BeforeUpsertHook, memberBeforeUpsertHook)
	if err = o.doBeforeUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpsertHook function to empty object, but got: %#v", o)
	}
	memberBeforeUpsertHooks = []MemberHook{}

	AddMemberHook(boil.AfterUpsertHook, memberAfterUpsertHook)
	if err = o.doAfterUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpsertHook function to empty object, but got: %#v", o)
	}
	memberAfterUpsertHooks = []MemberHook{}
}

func testMembersInsert(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testMembersInsertWhitelist(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Whitelist(memberColumnsWithoutDefault...)); err != nil {
		t.Error(err)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testMemberToManyOrganizations(t *testing.T) {
	var err error
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c Organization

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	if err = randomize.Struct(seed, &b, organizationDBTypes, false, organizationColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, organizationDBTypes, false, organizationColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}

	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	_, err = tx.Exec("insert into \"member_organizations\" (\"member_id\", \"organization_id\") values ($1, $2)", a.ID, b.ID)
	if err != nil {
		t.Fatal(err)
	}
	_, err = tx.Exec("insert into \"member_organizations\" (\"member_id\", \"organization_id\") values ($1, $2)", a.ID, c.ID)
	if err != nil {
		t.Fatal(err)
	}

	check, err := a.Organizations().All(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	bFound, cFound := false, false
	for _, v := range check {
		if v.ID == b.ID {
			bFound = true
		}
		if v.ID == c.ID {
			cFound = true
		}
	}

	if !bFound {
		t.Error("expected to find b")
	}
	if !cFound {
		t.Error("expected to find c")
	}

	slice := MemberSlice{&a}
	if err = a.L.LoadOrganizations(ctx, tx, false, (*[]*Member)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.Organizations); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	a.R.Organizations = nil
	if err = a.L.LoadOrganizations(ctx, tx, true, &a, nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.Organizations); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	if t.Failed() {
		t.Logf("%#v", check)
	}
}

func testMemberToManyMemberships(t *testing.T) {
	var err error
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c Membership

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	if err = randomize.Struct(seed, &b, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}

	b.MemberID = a.ID
	c.MemberID = a.ID

	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := a.Memberships().All(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	bFound, cFound := false, false
	for _, v := range check {
		if v.MemberID == b.MemberID {
			bFound = true
		}
		if v.MemberID == c.MemberID {
			cFound = true
		}
	}

	if !bFound {
		t.Error("expected to find b")
	}
	if !cFound {
		t.Error("expected to find c")
	}

	slice := MemberSlice{&a}
	if err = a.L.LoadMemberships(ctx, tx, false, (*[]*Member)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.Memberships); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	a.R.Memberships = nil
	if err = a.L.LoadMemberships(ctx, tx, true, &a, nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.Memberships); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	if t.Failed() {
		t.Logf("%#v", check)
	}
}

func testMemberToManyShiftAssignments(t *testing.T) {
	var err error
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c ShiftAssignment

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	if err = randomize.Struct(seed, &b, shiftAssignmentDBTypes, false, shiftAssignmentColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, shiftAssignmentDBTypes, false, shiftAssignmentColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}

	b.MemberID = a.ID
	c.MemberID = a.ID

	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := a.ShiftAssignments().All(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	bFound, cFound := false, false
	for _, v := range check {
		if v.MemberID == b.MemberID {
			bFound = true
		}
		if v.MemberID == c.MemberID {
			cFound = true
		}
	}

	if !bFound {
		t.Error("expected to find b")
	}
	if !cFound {
		t.Error("expected to find c")
	}

	slice := MemberSlice{&a}
	if err = a.L.LoadShiftAssignments(ctx, tx, false, (*[]*Member)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.ShiftAssignments); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	a.R.ShiftAssignments = nil
	if err = a.L.LoadShiftAssignments(ctx, tx, true, &a, nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.ShiftAssignments); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	if t.Failed() {
		t.Logf("%#v", check)
	}
}

func testMemberToManyAddOpOrganizations(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c, d, e Organization

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*Organization{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, organizationDBTypes, false, strmangle.SetComplement(organizationPrimaryKeyColumns, organizationColumnsWithoutDefault)...); err != nil {
			t.Fatal(err)
		}
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	foreignersSplitByInsertion := [][]*Organization{
		{&b, &c},
		{&d, &e},
	}

	for i, x := range foreignersSplitByInsertion {
		err = a.AddOrganizations(ctx, tx, i != 0, x...)
		if err != nil {
			t.Fatal(err)
		}

		first := x[0]
		second := x[1]

		if first.R.Members[0] != &a {
			t.Error("relationship was not added properly to the slice")
		}
		if second.R.Members[0] != &a {
			t.Error("relationship was not added properly to the slice")
		}

		if a.R.Organizations[i*2] != first {
			t.Error("relationship struct slice not set to correct value")
		}
		if a.R.Organizations[i*2+1] != second {
			t.Error("relationship struct slice not set to correct value")
		}

		count, err := a.Organizations().Count(ctx, tx)
		if err != nil {
			t.Fatal(err)
		}
		if want := int64((i + 1) * 2); count != want {
			t.Error("want", want, "got", count)
		}
	}
}

func testMemberToManySetOpOrganizations(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c, d, e Organization

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*Organization{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, organizationDBTypes, false, strmangle.SetComplement(organizationPrimaryKeyColumns, organizationColumnsWithoutDefault)...); err != nil {
			t.Fatal(err)
		}
	}

	if err = a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	err = a.SetOrganizations(ctx, tx, false, &b, &c)
	if err != nil {
		t.Fatal(err)
	}

	count, err := a.Organizations().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 2 {
		t.Error("count was wrong:", count)
	}

	err = a.SetOrganizations(ctx, tx, true, &d, &e)
	if err != nil {
		t.Fatal(err)
	}

	count, err = a.Organizations().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 2 {
		t.Error("count was wrong:", count)
	}

	// The following checks cannot be implemented since we have no handle
	// to these when we call Set(). Leaving them here as wishful thinking
	// and to let people know there's dragons.
	//
	// if len(b.R.Members) != 0 {
	// 	t.Error("relationship was not removed properly from the slice")
	// }
	// if len(c.R.Members) != 0 {
	// 	t.Error("relationship was not removed properly from the slice")
	// }
	if d.R.Members[0] != &a {
		t.Error("relationship was not added properly to the slice")
	}
	if e.R.Members[0] != &a {
		t.Error("relationship was not added properly to the slice")
	}

	if a.R.Organizations[0] != &d {
		t.Error("relationship struct slice not set to correct value")
	}
	if a.R.Organizations[1] != &e {
		t.Error("relationship struct slice not set to correct value")
	}
}

func testMemberToManyRemoveOpOrganizations(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c, d, e Organization

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*Organization{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, organizationDBTypes, false, strmangle.SetComplement(organizationPrimaryKeyColumns, organizationColumnsWithoutDefault)...); err != nil {
			t.Fatal(err)
		}
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	err = a.AddOrganizations(ctx, tx, true, foreigners...)
	if err != nil {
		t.Fatal(err)
	}

	count, err := a.Organizations().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 4 {
		t.Error("count was wrong:", count)
	}

	err = a.RemoveOrganizations(ctx, tx, foreigners[:2]...)
	if err != nil {
		t.Fatal(err)
	}

	count, err = a.Organizations().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 2 {
		t.Error("count was wrong:", count)
	}

	if len(b.R.Members) != 0 {
		t.Error("relationship was not removed properly from the slice")
	}
	if len(c.R.Members) != 0 {
		t.Error("relationship was not removed properly from the slice")
	}
	if d.R.Members[0] != &a {
		t.Error("relationship was not added properly to the foreign struct")
	}
	if e.R.Members[0] != &a {
		t.Error("relationship was not added properly to the foreign struct")
	}

	if len(a.R.Organizations) != 2 {
		t.Error("should have preserved two relationships")
	}

	// Removal doesn't do a stable deletion for performance so we have to flip the order
	if a.R.Organizations[1] != &d {
		t.Error("relationship to d should have been preserved")
	}
	if a.R.Organizations[0] != &e {
		t.Error("relationship to e should have been preserved")
	}
}

func testMemberToManyAddOpMemberships(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c, d, e Membership

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*Membership{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, membershipDBTypes, false, strmangle.SetComplement(membershipPrimaryKeyColumns, membershipColumnsWithoutDefault)...); err != nil {
			t.Fatal(err)
		}
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	foreignersSplitByInsertion := [][]*Membership{
		{&b, &c},
		{&d, &e},
	}

	for i, x := range foreignersSplitByInsertion {
		err = a.AddMemberships(ctx, tx, i != 0, x...)
		if err != nil {
			t.Fatal(err)
		}

		first := x[0]
		second := x[1]

		if a.ID != first.MemberID {
			t.Error("foreign key was wrong value", a.ID, first.MemberID)
		}
		if a.ID != second.MemberID {
			t.Error("foreign key was wrong value", a.ID, second.MemberID)
		}

		if first.R.Member != &a {
			t.Error("relationship was not added properly to the foreign slice")
		}
		if second.R.Member != &a {
			t.Error("relationship was not added properly to the foreign slice")
		}

		if a.R.Memberships[i*2] != first {
			t.Error("relationship struct slice not set to correct value")
		}
		if a.R.Memberships[i*2+1] != second {
			t.Error("relationship struct slice not set to correct value")
		}

		count, err := a.Memberships().Count(ctx, tx)
		if err != nil {
			t.Fatal(err)
		}
		if want := int64((i + 1) * 2); count != want {
			t.Error("want", want, "got", count)
		}
	}
}
func testMemberToManyAddOpShiftAssignments(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c, d, e ShiftAssignment

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*ShiftAssignment{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, shiftAssignmentDBTypes, false, strmangle.SetComplement(shiftAssignmentPrimaryKeyColumns, shiftAssignmentColumnsWithoutDefault)...); err != nil {
			t.Fatal(err)
		}
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	foreignersSplitByInsertion := [][]*ShiftAssignment{
		{&b, &c},
		{&d, &e},
	}

	for i, x := range foreignersSplitByInsertion {
		err = a.AddShiftAssignments(ctx, tx, i != 0, x...)
		if err != nil {
			t.Fatal(err)
		}

		first := x[0]
		second := x[1]

		if a.ID != first.MemberID {
			t.Error("foreign key was wrong value", a.ID, first.MemberID)
		}
		if a.ID != second.MemberID {
			t.Error("foreign key was wrong value", a.ID, second.MemberID)
		}

		if first.R.Member != &a {
			t.Error("relationship was not added properly to the foreign slice")
		}
		if second.R.Member != &a {
			t.Error("relationship was not added properly to the foreign slice")
		}

		if a.R.ShiftAssignments[i*2] != first {
			t.Error("relationship struct slice not set to correct value")
		}
		if a.R.ShiftAssignments[i*2+1] != second {
			t.Error("relationship struct slice not set to correct value")
		}

		count, err := a.ShiftAssignments().Count(ctx, tx)
		if err != nil {
			t.Fatal(err)
		}
		if want := int64((i + 1) * 2); count != want {
			t.Error("want", want, "got", count)
		}
	}
}
func testMemberToOneOrganizationUsingOrganization(t *testing.T) {
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var local Member
	var foreign Organization

	seed := randomize.NewSeed()
	if err := randomize.Struct(seed, &local, memberDBTypes, false, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}
	if err := randomize.Struct(seed, &foreign, organizationDBTypes, false, organizationColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Organization struct: %s", err)
	}

	if err := foreign.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	local.OrganizationID = foreign.ID
	if err := local.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := local.Organization().One(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	if check.ID != foreign.ID {
		t.Errorf("want: %v, got %v", foreign.ID, check.ID)
	}

	ranAfterSelectHook := false
	AddOrganizationHook(boil.AfterSelectHook, func(ctx context.Context, e boil.ContextExecutor, o *Organization) error {
		ranAfterSelectHook = true
		return nil
	})

	slice := MemberSlice{&local}
	if err = local.L.LoadOrganization(ctx, tx, false, (*[]*Member)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if local.R.Organization == nil {
		t.Error("struct should have been eager loaded")
	}

	local.R.Organization = nil
	if err = local.L.LoadOrganization(ctx, tx, true, &local, nil); err != nil {
		t.Fatal(err)
	}
	if local.R.Organization == nil {
		t.Error("struct should have been eager loaded")
	}

	if !ranAfterSelectHook {
		t.Error("failed to run AfterSelect hook for relationship")
	}
}

func testMemberToOneSetOpOrganizationUsingOrganization(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Member
	var b, c Organization

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &b, organizationDBTypes, false, strmangle.SetComplement(organizationPrimaryKeyColumns, organizationColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, organizationDBTypes, false, strmangle.SetComplement(organizationPrimaryKeyColumns, organizationColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	for i, x := range []*Organization{&b, &c} {
		err = a.SetOrganization(ctx, tx, i != 0, x)
		if err != nil {
			t.Fatal(err)
		}

		if a.R.Organization != x {
			t.Error("relationship struct not set to correct value")
		}

		if x.R.Members[0] != &a {
			t.Error("failed to append to foreign relationship struct")
		}
		if a.OrganizationID != x.ID {
			t.Error("foreign key was wrong value", a.OrganizationID)
		}

		zero := reflect.Zero(reflect.TypeOf(a.OrganizationID))
		reflect.Indirect(reflect.ValueOf(&a.OrganizationID)).Set(zero)

		if err = a.Reload(ctx, tx); err != nil {
			t.Fatal("failed to reload", err)
		}

		if a.OrganizationID != x.ID {
			t.Error("foreign key was wrong value", a.OrganizationID, x.ID)
		}
	}
}

func testMembersReload(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if err = o.Reload(ctx, tx); err != nil {
		t.Error(err)
	}
}

func testMembersReloadAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := MemberSlice{o}

	if err = slice.ReloadAll(ctx, tx); err != nil {
		t.Error(err)
	}
}

func testMembersSelect(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := Members().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 1 {
		t.Error("want one record, got:", len(slice))
	}
}

var (
	memberDBTypes = map[string]string{`ID`: `uuid`, `OrganizationID`: `uuid`, `CreatedAt`: `timestamp with time zone`, `UpdatedAt`: `timestamp with time zone`, `FirstName`: `text`, `LastName`: `text`, `Email`: `text`, `Meta`: `jsonb`}
	_             = bytes.MinRead
)

func testMembersUpdate(t *testing.T) {
	t.Parallel()

	if 0 == len(memberPrimaryKeyColumns) {
		t.Skip("Skipping table with no primary key columns")
	}
	if len(memberAllColumns) == len(memberPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, memberDBTypes, true, memberPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	if rowsAff, err := o.Update(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only affect one row but affected", rowsAff)
	}
}

func testMembersSliceUpdateAll(t *testing.T) {
	t.Parallel()

	if len(memberAllColumns) == len(memberPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &Member{}
	if err = randomize.Struct(seed, o, memberDBTypes, true, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, memberDBTypes, true, memberPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	// Remove Primary keys and unique columns from what we plan to update
	var fields []string
	if strmangle.StringSliceMatch(memberAllColumns, memberPrimaryKeyColumns) {
		fields = memberAllColumns
	} else {
		fields = strmangle.SetComplement(
			memberAllColumns,
			memberPrimaryKeyColumns,
		)
	}

	value := reflect.Indirect(reflect.ValueOf(o))
	typ := reflect.TypeOf(o).Elem()
	n := typ.NumField()

	updateMap := M{}
	for _, col := range fields {
		for i := 0; i < n; i++ {
			f := typ.Field(i)
			if f.Tag.Get("boil") == col {
				updateMap[col] = value.Field(i).Interface()
			}
		}
	}

	slice := MemberSlice{o}
	if rowsAff, err := slice.UpdateAll(ctx, tx, updateMap); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("wanted one record updated but got", rowsAff)
	}
}

func testMembersUpsert(t *testing.T) {
	t.Parallel()

	if len(memberAllColumns) == len(memberPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	// Attempt the INSERT side of an UPSERT
	o := Member{}
	if err = randomize.Struct(seed, &o, memberDBTypes, true); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Upsert(ctx, tx, false, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert Member: %s", err)
	}

	count, err := Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}

	// Attempt the UPDATE side of an UPSERT
	if err = randomize.Struct(seed, &o, memberDBTypes, false, memberPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	if err = o.Upsert(ctx, tx, true, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert Member: %s", err)
	}

	count, err = Members().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

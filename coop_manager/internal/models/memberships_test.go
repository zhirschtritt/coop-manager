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

func testMemberships(t *testing.T) {
	t.Parallel()

	query := Memberships()

	if query.Query == nil {
		t.Error("expected a query, got nothing")
	}
}

func testMembershipsDelete(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
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

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testMembershipsQueryDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if rowsAff, err := Memberships().DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testMembershipsSliceDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := MembershipSlice{o}

	if rowsAff, err := slice.DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testMembershipsExists(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	e, err := MembershipExists(ctx, tx, o.MemberID, o.OrganizationID, o.CreatedBy)
	if err != nil {
		t.Errorf("Unable to check if Membership exists: %s", err)
	}
	if !e {
		t.Errorf("Expected MembershipExists to return true, but got false.")
	}
}

func testMembershipsFind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	membershipFound, err := FindMembership(ctx, tx, o.MemberID, o.OrganizationID, o.CreatedBy)
	if err != nil {
		t.Error(err)
	}

	if membershipFound == nil {
		t.Error("want a record, got nil")
	}
}

func testMembershipsBind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if err = Memberships().Bind(ctx, tx, o); err != nil {
		t.Error(err)
	}
}

func testMembershipsOne(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if x, err := Memberships().One(ctx, tx); err != nil {
		t.Error(err)
	} else if x == nil {
		t.Error("expected to get a non nil record")
	}
}

func testMembershipsAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	membershipOne := &Membership{}
	membershipTwo := &Membership{}
	if err = randomize.Struct(seed, membershipOne, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}
	if err = randomize.Struct(seed, membershipTwo, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = membershipOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = membershipTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := Memberships().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 2 {
		t.Error("want 2 records, got:", len(slice))
	}
}

func testMembershipsCount(t *testing.T) {
	t.Parallel()

	var err error
	seed := randomize.NewSeed()
	membershipOne := &Membership{}
	membershipTwo := &Membership{}
	if err = randomize.Struct(seed, membershipOne, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}
	if err = randomize.Struct(seed, membershipTwo, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = membershipOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = membershipTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 2 {
		t.Error("want 2 records, got:", count)
	}
}

func membershipBeforeInsertHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipAfterInsertHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipAfterSelectHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipBeforeUpdateHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipAfterUpdateHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipBeforeDeleteHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipAfterDeleteHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipBeforeUpsertHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func membershipAfterUpsertHook(ctx context.Context, e boil.ContextExecutor, o *Membership) error {
	*o = Membership{}
	return nil
}

func testMembershipsHooks(t *testing.T) {
	t.Parallel()

	var err error

	ctx := context.Background()
	empty := &Membership{}
	o := &Membership{}

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, o, membershipDBTypes, false); err != nil {
		t.Errorf("Unable to randomize Membership object: %s", err)
	}

	AddMembershipHook(boil.BeforeInsertHook, membershipBeforeInsertHook)
	if err = o.doBeforeInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeInsertHook function to empty object, but got: %#v", o)
	}
	membershipBeforeInsertHooks = []MembershipHook{}

	AddMembershipHook(boil.AfterInsertHook, membershipAfterInsertHook)
	if err = o.doAfterInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterInsertHook function to empty object, but got: %#v", o)
	}
	membershipAfterInsertHooks = []MembershipHook{}

	AddMembershipHook(boil.AfterSelectHook, membershipAfterSelectHook)
	if err = o.doAfterSelectHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterSelectHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterSelectHook function to empty object, but got: %#v", o)
	}
	membershipAfterSelectHooks = []MembershipHook{}

	AddMembershipHook(boil.BeforeUpdateHook, membershipBeforeUpdateHook)
	if err = o.doBeforeUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpdateHook function to empty object, but got: %#v", o)
	}
	membershipBeforeUpdateHooks = []MembershipHook{}

	AddMembershipHook(boil.AfterUpdateHook, membershipAfterUpdateHook)
	if err = o.doAfterUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpdateHook function to empty object, but got: %#v", o)
	}
	membershipAfterUpdateHooks = []MembershipHook{}

	AddMembershipHook(boil.BeforeDeleteHook, membershipBeforeDeleteHook)
	if err = o.doBeforeDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeDeleteHook function to empty object, but got: %#v", o)
	}
	membershipBeforeDeleteHooks = []MembershipHook{}

	AddMembershipHook(boil.AfterDeleteHook, membershipAfterDeleteHook)
	if err = o.doAfterDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterDeleteHook function to empty object, but got: %#v", o)
	}
	membershipAfterDeleteHooks = []MembershipHook{}

	AddMembershipHook(boil.BeforeUpsertHook, membershipBeforeUpsertHook)
	if err = o.doBeforeUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpsertHook function to empty object, but got: %#v", o)
	}
	membershipBeforeUpsertHooks = []MembershipHook{}

	AddMembershipHook(boil.AfterUpsertHook, membershipAfterUpsertHook)
	if err = o.doAfterUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpsertHook function to empty object, but got: %#v", o)
	}
	membershipAfterUpsertHooks = []MembershipHook{}
}

func testMembershipsInsert(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testMembershipsInsertWhitelist(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Whitelist(membershipColumnsWithoutDefault...)); err != nil {
		t.Error(err)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testMembershipToOneCoopEventUsingCreatedByCoopEvent(t *testing.T) {
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var local Membership
	var foreign CoopEvent

	seed := randomize.NewSeed()
	if err := randomize.Struct(seed, &local, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}
	if err := randomize.Struct(seed, &foreign, coopEventDBTypes, false, coopEventColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize CoopEvent struct: %s", err)
	}

	if err := foreign.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	local.CreatedBy = foreign.ID
	if err := local.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := local.CreatedByCoopEvent().One(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	if check.ID != foreign.ID {
		t.Errorf("want: %v, got %v", foreign.ID, check.ID)
	}

	ranAfterSelectHook := false
	AddCoopEventHook(boil.AfterSelectHook, func(ctx context.Context, e boil.ContextExecutor, o *CoopEvent) error {
		ranAfterSelectHook = true
		return nil
	})

	slice := MembershipSlice{&local}
	if err = local.L.LoadCreatedByCoopEvent(ctx, tx, false, (*[]*Membership)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if local.R.CreatedByCoopEvent == nil {
		t.Error("struct should have been eager loaded")
	}

	local.R.CreatedByCoopEvent = nil
	if err = local.L.LoadCreatedByCoopEvent(ctx, tx, true, &local, nil); err != nil {
		t.Fatal(err)
	}
	if local.R.CreatedByCoopEvent == nil {
		t.Error("struct should have been eager loaded")
	}

	if !ranAfterSelectHook {
		t.Error("failed to run AfterSelect hook for relationship")
	}
}

func testMembershipToOneMemberUsingMember(t *testing.T) {
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var local Membership
	var foreign Member

	seed := randomize.NewSeed()
	if err := randomize.Struct(seed, &local, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}
	if err := randomize.Struct(seed, &foreign, memberDBTypes, false, memberColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Member struct: %s", err)
	}

	if err := foreign.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	local.MemberID = foreign.ID
	if err := local.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := local.Member().One(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	if check.ID != foreign.ID {
		t.Errorf("want: %v, got %v", foreign.ID, check.ID)
	}

	ranAfterSelectHook := false
	AddMemberHook(boil.AfterSelectHook, func(ctx context.Context, e boil.ContextExecutor, o *Member) error {
		ranAfterSelectHook = true
		return nil
	})

	slice := MembershipSlice{&local}
	if err = local.L.LoadMember(ctx, tx, false, (*[]*Membership)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if local.R.Member == nil {
		t.Error("struct should have been eager loaded")
	}

	local.R.Member = nil
	if err = local.L.LoadMember(ctx, tx, true, &local, nil); err != nil {
		t.Fatal(err)
	}
	if local.R.Member == nil {
		t.Error("struct should have been eager loaded")
	}

	if !ranAfterSelectHook {
		t.Error("failed to run AfterSelect hook for relationship")
	}
}

func testMembershipToOneMembershipTypeUsingMembershipType(t *testing.T) {
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var local Membership
	var foreign MembershipType

	seed := randomize.NewSeed()
	if err := randomize.Struct(seed, &local, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}
	if err := randomize.Struct(seed, &foreign, membershipTypeDBTypes, false, membershipTypeColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize MembershipType struct: %s", err)
	}

	if err := foreign.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	local.MembershipTypeID = foreign.ID
	if err := local.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := local.MembershipType().One(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	if check.ID != foreign.ID {
		t.Errorf("want: %v, got %v", foreign.ID, check.ID)
	}

	ranAfterSelectHook := false
	AddMembershipTypeHook(boil.AfterSelectHook, func(ctx context.Context, e boil.ContextExecutor, o *MembershipType) error {
		ranAfterSelectHook = true
		return nil
	})

	slice := MembershipSlice{&local}
	if err = local.L.LoadMembershipType(ctx, tx, false, (*[]*Membership)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if local.R.MembershipType == nil {
		t.Error("struct should have been eager loaded")
	}

	local.R.MembershipType = nil
	if err = local.L.LoadMembershipType(ctx, tx, true, &local, nil); err != nil {
		t.Fatal(err)
	}
	if local.R.MembershipType == nil {
		t.Error("struct should have been eager loaded")
	}

	if !ranAfterSelectHook {
		t.Error("failed to run AfterSelect hook for relationship")
	}
}

func testMembershipToOneOrganizationUsingOrganization(t *testing.T) {
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var local Membership
	var foreign Organization

	seed := randomize.NewSeed()
	if err := randomize.Struct(seed, &local, membershipDBTypes, false, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
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

	slice := MembershipSlice{&local}
	if err = local.L.LoadOrganization(ctx, tx, false, (*[]*Membership)(&slice), nil); err != nil {
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

func testMembershipToOneSetOpCoopEventUsingCreatedByCoopEvent(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Membership
	var b, c CoopEvent

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, membershipDBTypes, false, strmangle.SetComplement(membershipPrimaryKeyColumns, membershipColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &b, coopEventDBTypes, false, strmangle.SetComplement(coopEventPrimaryKeyColumns, coopEventColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, coopEventDBTypes, false, strmangle.SetComplement(coopEventPrimaryKeyColumns, coopEventColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	for i, x := range []*CoopEvent{&b, &c} {
		err = a.SetCreatedByCoopEvent(ctx, tx, i != 0, x)
		if err != nil {
			t.Fatal(err)
		}

		if a.R.CreatedByCoopEvent != x {
			t.Error("relationship struct not set to correct value")
		}

		if x.R.CreatedByMemberships[0] != &a {
			t.Error("failed to append to foreign relationship struct")
		}
		if a.CreatedBy != x.ID {
			t.Error("foreign key was wrong value", a.CreatedBy)
		}

		if exists, err := MembershipExists(ctx, tx, a.MemberID, a.OrganizationID, a.CreatedBy); err != nil {
			t.Fatal(err)
		} else if !exists {
			t.Error("want 'a' to exist")
		}

	}
}
func testMembershipToOneSetOpMemberUsingMember(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Membership
	var b, c Member

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, membershipDBTypes, false, strmangle.SetComplement(membershipPrimaryKeyColumns, membershipColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &b, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, memberDBTypes, false, strmangle.SetComplement(memberPrimaryKeyColumns, memberColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	for i, x := range []*Member{&b, &c} {
		err = a.SetMember(ctx, tx, i != 0, x)
		if err != nil {
			t.Fatal(err)
		}

		if a.R.Member != x {
			t.Error("relationship struct not set to correct value")
		}

		if x.R.Memberships[0] != &a {
			t.Error("failed to append to foreign relationship struct")
		}
		if a.MemberID != x.ID {
			t.Error("foreign key was wrong value", a.MemberID)
		}

		if exists, err := MembershipExists(ctx, tx, a.MemberID, a.OrganizationID, a.CreatedBy); err != nil {
			t.Fatal(err)
		} else if !exists {
			t.Error("want 'a' to exist")
		}

	}
}
func testMembershipToOneSetOpMembershipTypeUsingMembershipType(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Membership
	var b, c MembershipType

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, membershipDBTypes, false, strmangle.SetComplement(membershipPrimaryKeyColumns, membershipColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &b, membershipTypeDBTypes, false, strmangle.SetComplement(membershipTypePrimaryKeyColumns, membershipTypeColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, membershipTypeDBTypes, false, strmangle.SetComplement(membershipTypePrimaryKeyColumns, membershipTypeColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	for i, x := range []*MembershipType{&b, &c} {
		err = a.SetMembershipType(ctx, tx, i != 0, x)
		if err != nil {
			t.Fatal(err)
		}

		if a.R.MembershipType != x {
			t.Error("relationship struct not set to correct value")
		}

		if x.R.Memberships[0] != &a {
			t.Error("failed to append to foreign relationship struct")
		}
		if a.MembershipTypeID != x.ID {
			t.Error("foreign key was wrong value", a.MembershipTypeID)
		}

		zero := reflect.Zero(reflect.TypeOf(a.MembershipTypeID))
		reflect.Indirect(reflect.ValueOf(&a.MembershipTypeID)).Set(zero)

		if err = a.Reload(ctx, tx); err != nil {
			t.Fatal("failed to reload", err)
		}

		if a.MembershipTypeID != x.ID {
			t.Error("foreign key was wrong value", a.MembershipTypeID, x.ID)
		}
	}
}
func testMembershipToOneSetOpOrganizationUsingOrganization(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a Membership
	var b, c Organization

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, membershipDBTypes, false, strmangle.SetComplement(membershipPrimaryKeyColumns, membershipColumnsWithoutDefault)...); err != nil {
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

		if x.R.Memberships[0] != &a {
			t.Error("failed to append to foreign relationship struct")
		}
		if a.OrganizationID != x.ID {
			t.Error("foreign key was wrong value", a.OrganizationID)
		}

		if exists, err := MembershipExists(ctx, tx, a.MemberID, a.OrganizationID, a.CreatedBy); err != nil {
			t.Fatal(err)
		} else if !exists {
			t.Error("want 'a' to exist")
		}

	}
}

func testMembershipsReload(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
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

func testMembershipsReloadAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := MembershipSlice{o}

	if err = slice.ReloadAll(ctx, tx); err != nil {
		t.Error(err)
	}
}

func testMembershipsSelect(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := Memberships().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 1 {
		t.Error("want one record, got:", len(slice))
	}
}

var (
	membershipDBTypes = map[string]string{`MemberID`: `uuid`, `MembershipTypeID`: `uuid`, `OrganizationID`: `uuid`, `CreatedBy`: `uuid`, `StartDate`: `timestamp with time zone`, `EndDate`: `timestamp with time zone`, `Status`: `text`}
	_                 = bytes.MinRead
)

func testMembershipsUpdate(t *testing.T) {
	t.Parallel()

	if 0 == len(membershipPrimaryKeyColumns) {
		t.Skip("Skipping table with no primary key columns")
	}
	if len(membershipAllColumns) == len(membershipPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	if rowsAff, err := o.Update(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only affect one row but affected", rowsAff)
	}
}

func testMembershipsSliceUpdateAll(t *testing.T) {
	t.Parallel()

	if len(membershipAllColumns) == len(membershipPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &Membership{}
	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, membershipDBTypes, true, membershipPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	// Remove Primary keys and unique columns from what we plan to update
	var fields []string
	if strmangle.StringSliceMatch(membershipAllColumns, membershipPrimaryKeyColumns) {
		fields = membershipAllColumns
	} else {
		fields = strmangle.SetComplement(
			membershipAllColumns,
			membershipPrimaryKeyColumns,
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

	slice := MembershipSlice{o}
	if rowsAff, err := slice.UpdateAll(ctx, tx, updateMap); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("wanted one record updated but got", rowsAff)
	}
}

func testMembershipsUpsert(t *testing.T) {
	t.Parallel()

	if len(membershipAllColumns) == len(membershipPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	// Attempt the INSERT side of an UPSERT
	o := Membership{}
	if err = randomize.Struct(seed, &o, membershipDBTypes, true); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Upsert(ctx, tx, false, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert Membership: %s", err)
	}

	count, err := Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}

	// Attempt the UPDATE side of an UPSERT
	if err = randomize.Struct(seed, &o, membershipDBTypes, false, membershipPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize Membership struct: %s", err)
	}

	if err = o.Upsert(ctx, tx, true, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert Membership: %s", err)
	}

	count, err = Memberships().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

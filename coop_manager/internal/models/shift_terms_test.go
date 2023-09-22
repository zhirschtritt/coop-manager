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

func testShiftTerms(t *testing.T) {
	t.Parallel()

	query := ShiftTerms()

	if query.Query == nil {
		t.Error("expected a query, got nothing")
	}
}

func testShiftTermsDelete(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
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

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testShiftTermsQueryDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if rowsAff, err := ShiftTerms().DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testShiftTermsSliceDeleteAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := ShiftTermSlice{o}

	if rowsAff, err := slice.DeleteAll(ctx, tx); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only have deleted one row, but affected:", rowsAff)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 0 {
		t.Error("want zero records, got:", count)
	}
}

func testShiftTermsExists(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	e, err := ShiftTermExists(ctx, tx, o.ID)
	if err != nil {
		t.Errorf("Unable to check if ShiftTerm exists: %s", err)
	}
	if !e {
		t.Errorf("Expected ShiftTermExists to return true, but got false.")
	}
}

func testShiftTermsFind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	shiftTermFound, err := FindShiftTerm(ctx, tx, o.ID)
	if err != nil {
		t.Error(err)
	}

	if shiftTermFound == nil {
		t.Error("want a record, got nil")
	}
}

func testShiftTermsBind(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if err = ShiftTerms().Bind(ctx, tx, o); err != nil {
		t.Error(err)
	}
}

func testShiftTermsOne(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	if x, err := ShiftTerms().One(ctx, tx); err != nil {
		t.Error(err)
	} else if x == nil {
		t.Error("expected to get a non nil record")
	}
}

func testShiftTermsAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	shiftTermOne := &ShiftTerm{}
	shiftTermTwo := &ShiftTerm{}
	if err = randomize.Struct(seed, shiftTermOne, shiftTermDBTypes, false, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}
	if err = randomize.Struct(seed, shiftTermTwo, shiftTermDBTypes, false, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = shiftTermOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = shiftTermTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := ShiftTerms().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 2 {
		t.Error("want 2 records, got:", len(slice))
	}
}

func testShiftTermsCount(t *testing.T) {
	t.Parallel()

	var err error
	seed := randomize.NewSeed()
	shiftTermOne := &ShiftTerm{}
	shiftTermTwo := &ShiftTerm{}
	if err = randomize.Struct(seed, shiftTermOne, shiftTermDBTypes, false, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}
	if err = randomize.Struct(seed, shiftTermTwo, shiftTermDBTypes, false, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = shiftTermOne.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}
	if err = shiftTermTwo.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 2 {
		t.Error("want 2 records, got:", count)
	}
}

func shiftTermBeforeInsertHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermAfterInsertHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermAfterSelectHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermBeforeUpdateHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermAfterUpdateHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermBeforeDeleteHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermAfterDeleteHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermBeforeUpsertHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func shiftTermAfterUpsertHook(ctx context.Context, e boil.ContextExecutor, o *ShiftTerm) error {
	*o = ShiftTerm{}
	return nil
}

func testShiftTermsHooks(t *testing.T) {
	t.Parallel()

	var err error

	ctx := context.Background()
	empty := &ShiftTerm{}
	o := &ShiftTerm{}

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, o, shiftTermDBTypes, false); err != nil {
		t.Errorf("Unable to randomize ShiftTerm object: %s", err)
	}

	AddShiftTermHook(boil.BeforeInsertHook, shiftTermBeforeInsertHook)
	if err = o.doBeforeInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeInsertHook function to empty object, but got: %#v", o)
	}
	shiftTermBeforeInsertHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.AfterInsertHook, shiftTermAfterInsertHook)
	if err = o.doAfterInsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterInsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterInsertHook function to empty object, but got: %#v", o)
	}
	shiftTermAfterInsertHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.AfterSelectHook, shiftTermAfterSelectHook)
	if err = o.doAfterSelectHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterSelectHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterSelectHook function to empty object, but got: %#v", o)
	}
	shiftTermAfterSelectHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.BeforeUpdateHook, shiftTermBeforeUpdateHook)
	if err = o.doBeforeUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpdateHook function to empty object, but got: %#v", o)
	}
	shiftTermBeforeUpdateHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.AfterUpdateHook, shiftTermAfterUpdateHook)
	if err = o.doAfterUpdateHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpdateHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpdateHook function to empty object, but got: %#v", o)
	}
	shiftTermAfterUpdateHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.BeforeDeleteHook, shiftTermBeforeDeleteHook)
	if err = o.doBeforeDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeDeleteHook function to empty object, but got: %#v", o)
	}
	shiftTermBeforeDeleteHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.AfterDeleteHook, shiftTermAfterDeleteHook)
	if err = o.doAfterDeleteHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterDeleteHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterDeleteHook function to empty object, but got: %#v", o)
	}
	shiftTermAfterDeleteHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.BeforeUpsertHook, shiftTermBeforeUpsertHook)
	if err = o.doBeforeUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doBeforeUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected BeforeUpsertHook function to empty object, but got: %#v", o)
	}
	shiftTermBeforeUpsertHooks = []ShiftTermHook{}

	AddShiftTermHook(boil.AfterUpsertHook, shiftTermAfterUpsertHook)
	if err = o.doAfterUpsertHooks(ctx, nil); err != nil {
		t.Errorf("Unable to execute doAfterUpsertHooks: %s", err)
	}
	if !reflect.DeepEqual(o, empty) {
		t.Errorf("Expected AfterUpsertHook function to empty object, but got: %#v", o)
	}
	shiftTermAfterUpsertHooks = []ShiftTermHook{}
}

func testShiftTermsInsert(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testShiftTermsInsertWhitelist(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Whitelist(shiftTermColumnsWithoutDefault...)); err != nil {
		t.Error(err)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

func testShiftTermToManyShifts(t *testing.T) {
	var err error
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a ShiftTerm
	var b, c Shift

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	if err = randomize.Struct(seed, &b, shiftDBTypes, false, shiftColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}
	if err = randomize.Struct(seed, &c, shiftDBTypes, false, shiftColumnsWithDefault...); err != nil {
		t.Fatal(err)
	}

	queries.Assign(&b.ShiftTermID, a.ID)
	queries.Assign(&c.ShiftTermID, a.ID)
	if err = b.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}
	if err = c.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	check, err := a.Shifts().All(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}

	bFound, cFound := false, false
	for _, v := range check {
		if queries.Equal(v.ShiftTermID, b.ShiftTermID) {
			bFound = true
		}
		if queries.Equal(v.ShiftTermID, c.ShiftTermID) {
			cFound = true
		}
	}

	if !bFound {
		t.Error("expected to find b")
	}
	if !cFound {
		t.Error("expected to find c")
	}

	slice := ShiftTermSlice{&a}
	if err = a.L.LoadShifts(ctx, tx, false, (*[]*ShiftTerm)(&slice), nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.Shifts); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	a.R.Shifts = nil
	if err = a.L.LoadShifts(ctx, tx, true, &a, nil); err != nil {
		t.Fatal(err)
	}
	if got := len(a.R.Shifts); got != 2 {
		t.Error("number of eager loaded records wrong, got:", got)
	}

	if t.Failed() {
		t.Logf("%#v", check)
	}
}

func testShiftTermToManyAddOpShifts(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a ShiftTerm
	var b, c, d, e Shift

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, shiftTermDBTypes, false, strmangle.SetComplement(shiftTermPrimaryKeyColumns, shiftTermColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*Shift{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, shiftDBTypes, false, strmangle.SetComplement(shiftPrimaryKeyColumns, shiftColumnsWithoutDefault)...); err != nil {
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

	foreignersSplitByInsertion := [][]*Shift{
		{&b, &c},
		{&d, &e},
	}

	for i, x := range foreignersSplitByInsertion {
		err = a.AddShifts(ctx, tx, i != 0, x...)
		if err != nil {
			t.Fatal(err)
		}

		first := x[0]
		second := x[1]

		if !queries.Equal(a.ID, first.ShiftTermID) {
			t.Error("foreign key was wrong value", a.ID, first.ShiftTermID)
		}
		if !queries.Equal(a.ID, second.ShiftTermID) {
			t.Error("foreign key was wrong value", a.ID, second.ShiftTermID)
		}

		if first.R.ShiftTerm != &a {
			t.Error("relationship was not added properly to the foreign slice")
		}
		if second.R.ShiftTerm != &a {
			t.Error("relationship was not added properly to the foreign slice")
		}

		if a.R.Shifts[i*2] != first {
			t.Error("relationship struct slice not set to correct value")
		}
		if a.R.Shifts[i*2+1] != second {
			t.Error("relationship struct slice not set to correct value")
		}

		count, err := a.Shifts().Count(ctx, tx)
		if err != nil {
			t.Fatal(err)
		}
		if want := int64((i + 1) * 2); count != want {
			t.Error("want", want, "got", count)
		}
	}
}

func testShiftTermToManySetOpShifts(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a ShiftTerm
	var b, c, d, e Shift

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, shiftTermDBTypes, false, strmangle.SetComplement(shiftTermPrimaryKeyColumns, shiftTermColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*Shift{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, shiftDBTypes, false, strmangle.SetComplement(shiftPrimaryKeyColumns, shiftColumnsWithoutDefault)...); err != nil {
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

	err = a.SetShifts(ctx, tx, false, &b, &c)
	if err != nil {
		t.Fatal(err)
	}

	count, err := a.Shifts().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 2 {
		t.Error("count was wrong:", count)
	}

	err = a.SetShifts(ctx, tx, true, &d, &e)
	if err != nil {
		t.Fatal(err)
	}

	count, err = a.Shifts().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 2 {
		t.Error("count was wrong:", count)
	}

	if !queries.IsValuerNil(b.ShiftTermID) {
		t.Error("want b's foreign key value to be nil")
	}
	if !queries.IsValuerNil(c.ShiftTermID) {
		t.Error("want c's foreign key value to be nil")
	}
	if !queries.Equal(a.ID, d.ShiftTermID) {
		t.Error("foreign key was wrong value", a.ID, d.ShiftTermID)
	}
	if !queries.Equal(a.ID, e.ShiftTermID) {
		t.Error("foreign key was wrong value", a.ID, e.ShiftTermID)
	}

	if b.R.ShiftTerm != nil {
		t.Error("relationship was not removed properly from the foreign struct")
	}
	if c.R.ShiftTerm != nil {
		t.Error("relationship was not removed properly from the foreign struct")
	}
	if d.R.ShiftTerm != &a {
		t.Error("relationship was not added properly to the foreign struct")
	}
	if e.R.ShiftTerm != &a {
		t.Error("relationship was not added properly to the foreign struct")
	}

	if a.R.Shifts[0] != &d {
		t.Error("relationship struct slice not set to correct value")
	}
	if a.R.Shifts[1] != &e {
		t.Error("relationship struct slice not set to correct value")
	}
}

func testShiftTermToManyRemoveOpShifts(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a ShiftTerm
	var b, c, d, e Shift

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, shiftTermDBTypes, false, strmangle.SetComplement(shiftTermPrimaryKeyColumns, shiftTermColumnsWithoutDefault)...); err != nil {
		t.Fatal(err)
	}
	foreigners := []*Shift{&b, &c, &d, &e}
	for _, x := range foreigners {
		if err = randomize.Struct(seed, x, shiftDBTypes, false, strmangle.SetComplement(shiftPrimaryKeyColumns, shiftColumnsWithoutDefault)...); err != nil {
			t.Fatal(err)
		}
	}

	if err := a.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Fatal(err)
	}

	err = a.AddShifts(ctx, tx, true, foreigners...)
	if err != nil {
		t.Fatal(err)
	}

	count, err := a.Shifts().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 4 {
		t.Error("count was wrong:", count)
	}

	err = a.RemoveShifts(ctx, tx, foreigners[:2]...)
	if err != nil {
		t.Fatal(err)
	}

	count, err = a.Shifts().Count(ctx, tx)
	if err != nil {
		t.Fatal(err)
	}
	if count != 2 {
		t.Error("count was wrong:", count)
	}

	if !queries.IsValuerNil(b.ShiftTermID) {
		t.Error("want b's foreign key value to be nil")
	}
	if !queries.IsValuerNil(c.ShiftTermID) {
		t.Error("want c's foreign key value to be nil")
	}

	if b.R.ShiftTerm != nil {
		t.Error("relationship was not removed properly from the foreign struct")
	}
	if c.R.ShiftTerm != nil {
		t.Error("relationship was not removed properly from the foreign struct")
	}
	if d.R.ShiftTerm != &a {
		t.Error("relationship to a should have been preserved")
	}
	if e.R.ShiftTerm != &a {
		t.Error("relationship to a should have been preserved")
	}

	if len(a.R.Shifts) != 2 {
		t.Error("should have preserved two relationships")
	}

	// Removal doesn't do a stable deletion for performance so we have to flip the order
	if a.R.Shifts[1] != &d {
		t.Error("relationship to d should have been preserved")
	}
	if a.R.Shifts[0] != &e {
		t.Error("relationship to e should have been preserved")
	}
}

func testShiftTermToOneOrganizationUsingOrganization(t *testing.T) {
	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var local ShiftTerm
	var foreign Organization

	seed := randomize.NewSeed()
	if err := randomize.Struct(seed, &local, shiftTermDBTypes, false, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
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

	slice := ShiftTermSlice{&local}
	if err = local.L.LoadOrganization(ctx, tx, false, (*[]*ShiftTerm)(&slice), nil); err != nil {
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

func testShiftTermToOneSetOpOrganizationUsingOrganization(t *testing.T) {
	var err error

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()

	var a ShiftTerm
	var b, c Organization

	seed := randomize.NewSeed()
	if err = randomize.Struct(seed, &a, shiftTermDBTypes, false, strmangle.SetComplement(shiftTermPrimaryKeyColumns, shiftTermColumnsWithoutDefault)...); err != nil {
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

		if x.R.ShiftTerms[0] != &a {
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

func testShiftTermsReload(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
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

func testShiftTermsReloadAll(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice := ShiftTermSlice{o}

	if err = slice.ReloadAll(ctx, tx); err != nil {
		t.Error(err)
	}
}

func testShiftTermsSelect(t *testing.T) {
	t.Parallel()

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	slice, err := ShiftTerms().All(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if len(slice) != 1 {
		t.Error("want one record, got:", len(slice))
	}
}

var (
	shiftTermDBTypes = map[string]string{`ID`: `uuid`, `OrganizationID`: `uuid`, `Name`: `text`, `StartDate`: `timestamp with time zone`, `EndDate`: `timestamp with time zone`, `RepeatPattern`: `text`}
	_                = bytes.MinRead
)

func testShiftTermsUpdate(t *testing.T) {
	t.Parallel()

	if 0 == len(shiftTermPrimaryKeyColumns) {
		t.Skip("Skipping table with no primary key columns")
	}
	if len(shiftTermAllColumns) == len(shiftTermPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	if rowsAff, err := o.Update(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("should only affect one row but affected", rowsAff)
	}
}

func testShiftTermsSliceUpdateAll(t *testing.T) {
	t.Parallel()

	if len(shiftTermAllColumns) == len(shiftTermPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	o := &ShiftTerm{}
	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermColumnsWithDefault...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Insert(ctx, tx, boil.Infer()); err != nil {
		t.Error(err)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}

	if count != 1 {
		t.Error("want one record, got:", count)
	}

	if err = randomize.Struct(seed, o, shiftTermDBTypes, true, shiftTermPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	// Remove Primary keys and unique columns from what we plan to update
	var fields []string
	if strmangle.StringSliceMatch(shiftTermAllColumns, shiftTermPrimaryKeyColumns) {
		fields = shiftTermAllColumns
	} else {
		fields = strmangle.SetComplement(
			shiftTermAllColumns,
			shiftTermPrimaryKeyColumns,
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

	slice := ShiftTermSlice{o}
	if rowsAff, err := slice.UpdateAll(ctx, tx, updateMap); err != nil {
		t.Error(err)
	} else if rowsAff != 1 {
		t.Error("wanted one record updated but got", rowsAff)
	}
}

func testShiftTermsUpsert(t *testing.T) {
	t.Parallel()

	if len(shiftTermAllColumns) == len(shiftTermPrimaryKeyColumns) {
		t.Skip("Skipping table with only primary key columns")
	}

	seed := randomize.NewSeed()
	var err error
	// Attempt the INSERT side of an UPSERT
	o := ShiftTerm{}
	if err = randomize.Struct(seed, &o, shiftTermDBTypes, true); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	ctx := context.Background()
	tx := MustTx(boil.BeginTx(ctx, nil))
	defer func() { _ = tx.Rollback() }()
	if err = o.Upsert(ctx, tx, false, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert ShiftTerm: %s", err)
	}

	count, err := ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}

	// Attempt the UPDATE side of an UPSERT
	if err = randomize.Struct(seed, &o, shiftTermDBTypes, false, shiftTermPrimaryKeyColumns...); err != nil {
		t.Errorf("Unable to randomize ShiftTerm struct: %s", err)
	}

	if err = o.Upsert(ctx, tx, true, nil, boil.Infer(), boil.Infer()); err != nil {
		t.Errorf("Unable to upsert ShiftTerm: %s", err)
	}

	count, err = ShiftTerms().Count(ctx, tx)
	if err != nil {
		t.Error(err)
	}
	if count != 1 {
		t.Error("want one record, got:", count)
	}
}

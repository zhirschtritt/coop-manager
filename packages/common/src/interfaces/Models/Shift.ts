/**
 * Shift terms organize groups of shifts on a repeating basis (eg. all thursdays until ...).
 * If a shift does *not* repeat, it will effectively be 1-to-1, term-to-shift, with a pattern count = 1
 */
export interface ShiftTerm {
  id: string;

  /** Friendly display name, must be unique for UX */
  name: string;

  startDate: Date;

  endDate: Date;

  /** Generated field, not stored in db */
  lengthInDays: number;

  /** rrule string, see: https://github.com/jakubroztocil/rrule */
  pattern: string;
}

export interface Shift {
  id: string;
  /** Timestamp start of shift */
  startsAt: Date;
  /** Timestamp end of shift */
  endsAt: Date;

  shiftTermId: string;

  // TODO: add status?: 'cancelled' | null
}

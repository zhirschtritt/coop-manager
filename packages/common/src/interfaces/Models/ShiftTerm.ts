/**
 * Shift terms organize groups of shifts on a repeating basis (eg. all thursdays until ...).
 * Not all shifts belong to a term.
 */
export interface ShiftTerm {
  id: string;

  /** Friendly display name, must be unique for UX */
  name: string;

  startDate: Date;

  endDate: Date;

  /** Generated field, not stored in db */
  lengthInDays: number;
}

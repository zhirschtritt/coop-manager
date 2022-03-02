export interface ShiftAssignment {
  id: string;

  /** A null memberId indicates an empty _slot_ for the shift */
  memberId: string | null;

  /** An assignment always requires a shift */
  shiftId: string;

  /** Event that created this assignment */
  createdBy: string;

  /** Name of the shift slot that this assignment fulfills, eg. "default", "primary", "backup", etc */
  slot: string;
}

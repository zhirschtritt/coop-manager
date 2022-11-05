export interface ShiftAssignment {
  id: string;

  /** A null memberId indicates an empty _slot_ for the shift */
  memberId: string | null;

  /** An assignment always requires a shift */
  shiftId: string;

  /** Event that created this assignment */
  createdBy: string;

  /** The shift slot id for this assignment */
  shiftSlotId: string;
}

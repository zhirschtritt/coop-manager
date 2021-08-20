export interface ShiftAssignment {
  id: string;
  memberId: string;
  shiftId: string;

  /** Event that created this assignment */
  createdBy: string;
}

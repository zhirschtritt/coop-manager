export interface Term {
  id: string;
  startDate: Date;
  endDate: Date;
  lengthInDays: number;
  /** rrule string */
  pattern: string;
  /** these are document reference strings in firestore */
  shiftRefs: string[];
}

export interface Shift {
  id: string;
  /** Date of shift */
  date: Date;
  /** Shop could be closed */
  status: 'staffed' | 'open' | 'shop-closed';
  /** this is a document reference string in firestore */
  termRef: string;
}

export interface StaffShift {
  id: string;
  /** fkey on Member with type 'staff'.
  * this is a document reference string in firestore */
  staffMemberRef: string;
  /** fkey on Shift.
   * * this is a document reference string in firestore */
  shiftId: string;
}


import {Timestamped} from './Timestamped';

export interface ShiftTerm extends Timestamped {
  id: string;
  startDate: Date;
  endDate: Date;
  lengthInDays: number;
  /** rrule string, see: https://github.com/jakubroztocil/rrule */
  pattern: string;
}

export interface Shift {
  id: string;
  /** Date of shift */
  date: Date;
  /** Shop could be closed */
  status: 'staffed' | 'open' | 'shop-closed';

  shiftTermId: string;
}

export interface ShiftAssignment extends Timestamped {
  id: string;
  memberId: string;
  shiftId: string;
}


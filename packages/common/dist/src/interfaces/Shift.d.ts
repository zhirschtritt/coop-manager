import { Timestamped } from './Timestamped';
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
}
export interface ShiftAssignment extends Timestamped {
    id: string;
    memberId: string;
    shiftId: string;
}

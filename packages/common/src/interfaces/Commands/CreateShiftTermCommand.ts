import {ShiftSlot} from '../Models';

export type rruleString = string;
export type HourAndMinute = `${number}${number}:${number}${number}`;
export interface CreateShiftTermCommand {
  requestId: string;
  name: string;
  defaultSlots: ShiftSlot[];
  occurrences: Date[];

  shiftStart: HourAndMinute;
  shiftEnd: HourAndMinute;
}

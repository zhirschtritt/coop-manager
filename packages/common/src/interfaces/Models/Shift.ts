/**
 * Each shift is created with one or many slots that
 * can be fulfilled with shift assignments.
 */
export interface ShiftSlot {
  id: string;
  /** Slot name, eg. "primary", "backup", "opener" */
  name: string;

  shiftId: string;

  data: ShiftSlotData;
}
export interface ShiftSlotData {
  maxInstances?: number;
  minInstances?: number;
}

export interface Shift {
  id: string;
  /** Timestamp start of shift */
  startsAt: Date;
  /** Timestamp end of shift */
  endsAt: Date;

  termId?: string | null;

  slots: ShiftSlot[];

  // TODO: add status?: 'cancelled' | null
}

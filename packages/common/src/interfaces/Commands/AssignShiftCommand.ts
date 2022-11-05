import {Actor} from '../Events';

/**
 * Assign shift to member.
 * Used for assigning shifts to staff and volunteers,
 * not for "reserving" blocks of time for members or walk-ins
 * */
export interface AssignShiftCommand {
  requestId: string;
  shiftId: string;
  memberId: string;
  actor: Actor;
  shiftSlotId?: string;
  slot: {
    id?: string;
    name: string;
    data: Record<string, unknown>;
  };
}

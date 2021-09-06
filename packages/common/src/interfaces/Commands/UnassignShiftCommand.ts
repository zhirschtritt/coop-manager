import {Actor} from '../Events';

/**
 * Un-associate shift with member
 */
export interface UnassignShiftCommand {
  requestId: string;
  shiftAssignmentId: string;
  actor: Actor;
  /**
   * Optional reason shift has been un-assigned to this member.
   * Eg. "Scheduling conflict"
   */
  reason?: string;
}

import {HourAndMinute} from '../Commands';
import {ShiftSlot} from '../Models';
import {CoopEventScopeType, CoopEventScopeTypes} from './EventScopeTypes';
import {CoopEventType, CoopEventTypes, MembershipEventTypes, ShiftTermEventTypes} from './EventTypes';

type StringyDate = string;
export interface BaseEventData {
  id?: string;
  type: CoopEventType;
  scopeType: CoopEventScopeType;
  scopeId: string;
  happenedAt: Date;
  data: Record<string, unknown>;
}
export interface InsertedBaseEventData {
  id: string;
  sequenceId: number;
  insertedAt: Date;
}

export type BaseEvent = BaseEventData & InsertedBaseEventData;

/** Extract pre-inserted data from event interface */
export type EventDataFrom<T extends BaseEvent> = {
  [K in keyof BaseEventData]: T[K];
};

export type Actor = {
  type: 'user' | 'device';
  id: string;
};

export interface ShiftAssignedEvent extends BaseEvent {
  type: typeof CoopEventTypes.SHIFT_ASSIGNED;
  scopeType: typeof CoopEventScopeTypes.SHIFT;
  data: {
    shiftId: string;
    memberId: string;
    actor: Actor;
    shiftAssignmentId: string;
    slotId: string;
  };
}

export interface ShiftUnassignedEvent extends BaseEvent {
  type: typeof CoopEventTypes.SHIFT_UNASSIGNED;
  scopeType: typeof CoopEventScopeTypes.SHIFT;
  data: {
    /**
     * The shift assignment itself will no longer exist when reading
     * this event back out again, so we de-normalize the shift/member too.
     */
    shiftAssignmentId: string;
    shiftId: string;
    slot: string;
    memberId: string;
    actor: Actor;
    reason?: string;
  };
}

export interface ShiftTermCreatedEvent extends BaseEvent {
  type: typeof ShiftTermEventTypes.SHIFT_TERM_CREATED;
  scopeType: typeof CoopEventScopeTypes.SHIFT_TERM;
  data: {
    termName: string;
    shiftOccurrences: Date[];
    defaultSlots: ShiftSlot[];
    shiftStart: HourAndMinute;
    shiftEnd: HourAndMinute;
    actor: Actor;
  };
}

/** Event emitted when a new membership is created/started */
export interface MembershipCreatedEvent extends BaseEvent {
  type: typeof MembershipEventTypes.MEMBERSHIP_CREATED;
  scopeType: typeof CoopEventScopeTypes.MEMBERSHIP;
  data: {
    membershipId: string;
    membershipTypeId: string;
    memberId: string;
    actor: Actor;
    startDate: StringyDate;
    endDate: StringyDate;
  };
}

export interface MembershipStartedEvent extends BaseEvent {
  type: typeof MembershipEventTypes.MEMBERSHIP_STARTED;
  scopeType: typeof CoopEventScopeTypes.MEMBERSHIP;
  data: {
    // nothing to see here (we can use scopeId for membership to start)
  };
}

export type CoopEvent =
  | ShiftAssignedEvent
  | ShiftUnassignedEvent
  | MembershipCreatedEvent
  | MembershipStartedEvent;

import {HourAndMinute, ShiftSlot} from '..';

export interface BaseEventData {
  id?: string;
  type: string;
  scopeType: string;
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

export const ShiftTermEventTypes = {
  SHIFT_TERM_CREATED: 'shift-term-created',
} as const;

export const ShiftEventTypes = {
  SHIFT_ASSIGNED: 'shift-assigned',
  SHIFT_UNASSIGNED: 'shift-unassigned',
} as const;

export const MemberEventTypes = {
  MEMBER_CREATED: 'member-created',
} as const;

export const MembershipEventTypes = {
  MEMBERSHIP_STARTED: 'membership_started',
  MEMBERSHIP_ENDED: 'membership_ended',
  MEMBERSHIP_CANCELLED: 'membership_cancelled',
} as const;

export const CoopEventTypes = {
  ...ShiftEventTypes,
  ...MemberEventTypes,
  ...MembershipEventTypes,
  ...ShiftTermEventTypes,
} as const;
export type CoopEventType = typeof CoopEventTypes[keyof typeof CoopEventTypes];

export const CoopEventScopeTypes = {
  SHIFT: 'shift',
  MEMBER: 'member',
  MEMBERSHIP: 'membership',
  SHIFT_TERM: 'shift-term',
} as const;
export type CoopEventScopeType = typeof CoopEventScopeTypes[keyof typeof CoopEventScopeTypes];

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
    slot: string;
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

export interface ShiftTermCreated extends BaseEvent {
  type: typeof ShiftTermEventTypes.SHIFT_TERM_CREATED;
  scopeType: typeof CoopEventScopeTypes.SHIFT_TERM;
  data: {
    termName: string;
    shiftOccurrences: Date[];
    defaultSlots: ShiftSlot[];
    shiftStart: HourAndMinute;
    shiftEnd: HourAndMinute;
  };
}

export type CoopEvent = ShiftAssignedEvent | ShiftUnassignedEvent;

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
export declare type BaseEvent = BaseEventData & InsertedBaseEventData;
/** Extract pre-insterted data from event interface */
export declare type EventDataFrom<T extends BaseEvent> = {
    [K in keyof BaseEventData]: T[K];
};
export declare const ShiftEventTypes: {
    readonly SHIFT_ASSIGNED: "shift-assigned";
    readonly SHIFT_UNASSIGNED: "shift-unassigned";
};
export declare const MemberEventTypes: {
    readonly MEMBER_CREATED: "member-created";
};
export declare const MembershipEventTypes: {
    readonly MEMBERSHIP_STARTED: "membership_started";
    readonly MEMBERSHIP_ENDED: "membership_ended";
    readonly MEMBERSHIP_CANCELLED: "membership_cancelled";
};
export declare const CoopEventTypes: {
    readonly MEMBERSHIP_STARTED: "membership_started";
    readonly MEMBERSHIP_ENDED: "membership_ended";
    readonly MEMBERSHIP_CANCELLED: "membership_cancelled";
    readonly MEMBER_CREATED: "member-created";
    readonly SHIFT_ASSIGNED: "shift-assigned";
    readonly SHIFT_UNASSIGNED: "shift-unassigned";
};
export declare type CoopEventType = typeof CoopEventTypes[keyof typeof CoopEventTypes];
export declare const CoopEventScopeTypes: {
    readonly SHIFT: "shift";
    readonly MEMBER: "member";
    readonly MEMBERSHIP: "membership";
};
export declare type CoopEventScopeType = typeof CoopEventScopeTypes[keyof typeof CoopEventScopeTypes];
export declare type Actor = {
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
    };
}
export declare type CoopEvent = ShiftAssignedEvent;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoopEventScopeTypes = exports.CoopEventTypes = exports.MembershipEventTypes = exports.MemberEventTypes = exports.ShiftEventTypes = void 0;
exports.ShiftEventTypes = {
    SHIFT_ASSIGNED: 'shift-assigned',
    SHIFT_UNASSIGNED: 'shift-unassigned',
};
exports.MemberEventTypes = {
    MEMBER_CREATED: 'member-created',
};
exports.MembershipEventTypes = {
    MEMBERSHIP_STARTED: 'membership_started',
    MEMBERSHIP_ENDED: 'membership_ended',
    MEMBERSHIP_CANCELLED: 'membership_cancelled',
};
exports.CoopEventTypes = {
    ...exports.ShiftEventTypes,
    ...exports.MemberEventTypes,
    ...exports.MembershipEventTypes,
};
exports.CoopEventScopeTypes = {
    SHIFT: 'shift',
    MEMBER: 'member',
    MEMBERSHIP: 'membership',
};
//# sourceMappingURL=EventInterfaces.js.map
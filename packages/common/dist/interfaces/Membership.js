"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipActiveStatus = exports.MemberTypes = void 0;
exports.MemberTypes = Object.freeze({
    /** Designates a member who is *not* a staff member or volunteer */
    BASE_MEMBER: 'base-member',
    STAFF: 'staff',
    VOLUNTEER: 'staff',
    /** Designates an disabled member (either staff or base) */
    INACTIVE: 'inactive',
});
exports.MembershipActiveStatus = {
    CURRENT: 'current',
    EXPIRED: 'expired',
    PAUSED: 'paused',
};
//# sourceMappingURL=Membership.js.map
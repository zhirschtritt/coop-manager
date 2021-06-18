export declare const MemberLevels: {
    /** Designates a member who is *not* a staff member or volunteer */
    readonly BASE: "base";
    /** Staff level member */
    readonly STAFF: "staff";
    /** Volunteer level member */
    readonly VOLUNTEER: "volunteer";
};
export declare type MemberLevel = typeof MemberLevels[keyof typeof MemberLevels];
export interface MembershipType {
    id: string;
    createdAt: Date;
    /** The display name of the membership, eg. '1 Year' */
    name: string;
    /** Enum, level of the membership */
    level: MemberLevel;
}
export declare const MembershipStatuses: {
    readonly ACTIVE: "active";
    readonly EXPIRED: "expired";
    readonly PAUSED: "paused";
};
export declare type MembershipStatus = typeof MembershipStatuses[keyof typeof MembershipStatuses];
export interface Membership {
    id: string;
    /** FK to Member Entity */
    memberId: string;
    /** FK to MembershipType Entity */
    membershipTypeId: string;
    startDate: Date;
    /** The expiration date for the membership. */
    endDate: Date;
    /** Status indicates the current state of the membership */
    status: MembershipStatus;
}

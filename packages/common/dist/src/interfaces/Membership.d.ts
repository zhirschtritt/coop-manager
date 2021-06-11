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
    /** Time limit for membership. -1 should indicate infinite */
    lengthInDays: number;
}
export declare const MembershipStatus: {
    readonly ACTIVE: "active";
    readonly EXPIRED: "expired";
    readonly PAUSED: "paused";
};
export declare type MembershipStatus = typeof MembershipStatus[keyof typeof MembershipStatus];
export interface Membership {
    id: string;
    /** weak FK to event that created the membership */
    createdBy: string;
    /** FK to Member Entity */
    memberId: string;
    /** FK to MembershipType Entity */
    membershipTypeId: string;
    startDate: Date;
    /** The expiration date for the membership.
     * Calculated based on startDate + membershipType.lengthInDays
     * */
    endDate: Date;
    /** Status indicates the current state of the membership */
    status: MembershipStatus;
}

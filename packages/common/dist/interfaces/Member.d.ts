export declare const MemberTypes: Readonly<{
    STAFF: "staff";
    /** Designates a member who is *not* a staff member */
    BASE_MEMBER: "base-member";
    /** Designates an disabled member (either staff or base) */
    INACTIVE: "inactive";
}>;
export declare type MemberType = typeof MemberTypes[keyof typeof MemberTypes];
export interface Member {
    id: string;
    type: MemberType;
    name: string;
    email: string;
}

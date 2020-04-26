export const MemberTypes = Object.freeze({
  STAFF: 'staff' as const,

  /** Designates a member who is *not* a staff member */
  BASE_MEMBER: 'base-member' as const,

  /** Designates an disabled member (either staff or base) */
  INACTIVE: 'inactive' as const,
});

export type MemberType = typeof MemberTypes[keyof typeof MemberTypes]

export interface Member {
  id: string;
  type: MemberType;
  name: string;
  email: string;
};

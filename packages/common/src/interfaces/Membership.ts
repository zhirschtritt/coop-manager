export const MemberLevels = {
  /** Designates a member who is *not* a staff member or volunteer */
  BASE: 'base',

  /** Staff level member */
  STAFF: 'staff',

  /** Volunteer level member */
  VOLUNTEER: 'volunteer',
} as const;

export type MemberLevel = typeof MemberLevels[keyof typeof MemberLevels];

export interface MembershipType {
  id: string;

  createdAt: Date;

  /** The display name of the membership, eg. '1 Year' */
  name: string;

  /** Enum, level of the membership */
  level: MemberLevel;

  /** Time limit for membership. -1 should indicate infinite */
  lengthInDays: number;

  // TODO: payment information
  // /** Monetary cost */
  // cost?: number;
}

export const MembershipStatus = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  PAUSED: 'paused',
} as const;

export type MembershipStatus = typeof MembershipStatus[keyof typeof MembershipStatus];

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

  // TODO: payment information
  // amountDue: number;
  // amountPaid: number;
}

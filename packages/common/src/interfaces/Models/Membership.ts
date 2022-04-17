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

  // TODO: payment information
  // /** Monetary cost */
  // cost?: number;
}

export const MembershipStatuses = {
  ACTIVE: 'active',
  /** The membership is slated to start at a future date */
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  PAUSED: 'paused',
} as const;

export type MembershipStatus = typeof MembershipStatuses[keyof typeof MembershipStatuses];

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

  // TODO: payment information
  // amountDue: number;
  // amountPaid: number;
}

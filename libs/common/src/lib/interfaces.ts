export const MemberTypes = Object.freeze({
  STAFF: 'staff' as const,
  /**
   * Designates a member who is *not* a staff member
   */
  DEFAULT: 'default' as const,
});

export type MemberType = typeof MemberTypes[keyof typeof MemberTypes]

export interface Name {
  first: string;
  last: string;
}

export interface Member {
  id: string;
  type: MemberType;
  displayName: string;
  name: Name;
};

export interface Term {
  id: string;
  startDate: Date;
  endDate: Date;
  lengthInDays: number;
  /** rrule string */
  pattern: string;
  /** these are document reference strings in firestore */
  shiftRefs: string[];
}

export interface Shift {
  id: string;
  /** Date of shift */
  date: Date;
  /** Shop could be closed */
  status: 'staffed' | 'open' | 'shop-closed';
  /** this is a document reference string in firestore */
  termRef: string;
}

export interface StaffShift {
  id: string;
  /** fkey on Member with type 'staff'.
  * this is a document reference string in firestore */
  staffMemberRef: string;
  /** fkey on Shift.
   * * this is a document reference string in firestore */
  shiftId: string;
}

export interface MembershipType {
  id: string;
  /** The display name of the membership, eg. '1 Year' */
  name: string;
  /** The base membership type used for tagging or categorizing. eg. annual, monthly, lifetime */
  type: string,
  /** Time limit for membership. -1 should indicate infinite */
  lengthInDays: number;
  /** Monetary cost */
  cost?: number;
}

export const MembershipActiveStatus = {
  CURRENT: 'current' as const,
  EXPIRED: 'expired' as const,
  PAUSED: 'paused' as const,
};
/** current indicates active memebership;
 * expired indicates the membership term has ended or been otherwise nullified;
 * pause indicates that the membership can be resumed;
*/
export type MembershipActiveStatus = typeof MembershipActiveStatus[keyof typeof MembershipActiveStatus];

/** Link between a Member and a MembershipType */
export interface Membership {
  id: string;
  memberId: string;
  membershipTypeId: string;
  /** The date the membership begins.
   * Often same as entity createdAt, but could be backdated or start in the future */
  startDate: Date;
  /** The expiration date for the membership.
   * Calculated based on startDate + membershipType.lengthInDays */
  endDate: Date;
  /** Status indicates the current state of the membership */
  status: MembershipActiveStatus;
  /** Paid in full or not */
  paid: boolean;

  // May want to include a paid amount to keep track of partial payments or subscriptions
  // that pay off the total cost on a regular schedule
  // paidAmount: number;
}

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
/** current indicates active membership;
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

import {Timestamped} from './Timestamped';

export const MemberTypes = Object.freeze({
  /** Designates a member who is *not* a staff member or volunteer */
  BASE_MEMBER: 'base-member' as const,

  STAFF: 'staff' as const,

  VOLUNTEER: 'staff' as const,

  /** Designates an disabled member (either staff or base) */
  INACTIVE: 'inactive' as const,
});

export type MemberType = typeof MemberTypes[keyof typeof MemberTypes]

export interface MembershipType extends Timestamped {
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
  CURRENT: 'current',
  EXPIRED: 'expired',
  PAUSED: 'paused',
} as const;
/** current indicates active membership;
 * expired indicates the membership term has ended or been otherwise nullified;
 * pause indicates that the membership can be resumed;
*/
export type MembershipActiveStatus = typeof MembershipActiveStatus[keyof typeof MembershipActiveStatus];

export interface Membership extends Timestamped {
  id: string;

  memberId: string;

  membershipTypeId: string;

  startDate: Date;

  /** The expiration date for the membership.
   * Calculated based on startDate + membershipType.lengthInDays
   * */
  endDate: Date;

  /** Status indicates the current state of the membership */
  status: MembershipActiveStatus;

  amountDue: number;

  amountPaid: number;
}

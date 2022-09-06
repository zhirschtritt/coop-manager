import { Member, Membership, MembershipType } from '@bikecoop/common';
import { gql } from 'graphql-request';

export namespace GetAllMembersQuery {
  export const query = gql`
    query {
      getMembers {
        firstName
        lastName
        id
        email
        memberships {
          status
          membershipType {
            level
          }
        }
      }
    }
  `;

  export interface Response extends Member {
    memberships: (Pick<Membership, 'status'> & { membershipType: Pick<MembershipType, 'level'> })[];
  }
}

import { gql } from '@apollo/client';

export const GET_MEMBERS = gql`
  {
    getMembers {
      id
      email
      memberships {
        id
      }
      membershipTypes {
        id
        name
        level
      }
    }
  }
`;

export const GET_SHIFTS_IN_RANGE = gql`
  query Shifts($from: DateTime!, $to: DateTime!) {
    getShifts(from: $from, to: $to) {
      id
      startsAt
      endsAt
      shiftTermId
      members {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

import { sub, add } from 'date-fns';
import { useQuery } from 'urql';
import { Member, Shift } from '@bikecoop/common';

export const GET_MEMBERS = `
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

export namespace GetShiftsQuery {
  export interface ShiftWithMembers extends Shift {
    getMembers: Member[];
  }

  export const query = `
  query Shifts($from: DateTime!, $to: DateTime!) {
    getShifts(from: $from, to: $to) {
      id
      startsAt
      endsAt
      termId
      getMembers {
        id
        email
        lastName
        firstName
      }
    }
  }
  `;
}

export function useShiftsWithMembers(now: Date) {
  const [{ data, error }] = useQuery<{
    getShifts: GetShiftsQuery.ShiftWithMembers[];
  }>({
    query: GetShiftsQuery.query,
    variables: {
      from: sub(now, { days: 90 }).toISOString(),
      to: add(now, { days: 90 }).toISOString(),
    },
    requestPolicy: 'cache-first',
  });

  return { data, error };
}

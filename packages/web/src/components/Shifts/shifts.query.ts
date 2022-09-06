import { Member, Shift, ShiftAssignment } from '@bikecoop/common';
import { gql } from 'graphql-request';

export namespace GetAllShiftsQuery {
  export const query = gql`
    query shifts {
      shifts {
        id
        startsAt
        endsAt
        slots
        shiftAssignments {
          id
          slot
          member {
            id
            firstName
            lastName
          }
        }
      }
    }
  `;

  export type ShiftResponse = Pick<Shift, 'id' | 'startsAt' | 'endsAt' | 'slots'> & {
    shiftAssignments: (Pick<ShiftAssignment, 'id' | 'slot'> & {
      member: Pick<Member, 'id' | 'firstName' | 'lastName'>;
    })[];
  };
}

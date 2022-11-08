import { Member, Shift, ShiftAssignment } from '@bikecoop/common';
import { gql } from 'graphql-request';

export namespace GetAllShiftsQuery {
  export const query = gql`
    query shifts {
      shifts {
        id
        startsAt
        endsAt
        slots {
          name
          shiftAssignments {
            id
            member {
              id
              firstName
              lastName
            }
          }
        }
      }
    }
  `;

  export type ShiftResponse = Pick<Shift, 'id' | 'startsAt' | 'endsAt'> & {
    slots: {
      name: string;
      shiftAssignments: (Pick<ShiftAssignment, 'id'> & {
        member: Pick<Member, 'id' | 'firstName' | 'lastName'>;
      })[];
    }[];
  };
}

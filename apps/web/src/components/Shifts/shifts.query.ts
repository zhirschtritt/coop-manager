import { Member, Shift, ShiftAssignment, ShiftSlotData } from '@bikecoop/common';
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
          data
          shiftAssignments {
            id
            member {
              id
              firstName
              lastName
              image
            }
          }
        }
      }
    }
  `;

  export type ShiftResponse = Pick<Shift, 'id' | 'startsAt' | 'endsAt'> & {
    slots: {
      name: string;
      data: ShiftSlotData;
      shiftAssignments: (Pick<ShiftAssignment, 'id'> & {
        member: Pick<Member, 'id' | 'firstName' | 'lastName' | 'image'>;
      })[];
    }[];
  };
}

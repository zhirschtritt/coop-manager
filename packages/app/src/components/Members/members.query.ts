import { gql } from 'graphql-request';

export const GET_ALL_MEMBERS = gql`
  query {
    getMembers {
      firstName
      lastName
      id
      email
    }
  }
`;

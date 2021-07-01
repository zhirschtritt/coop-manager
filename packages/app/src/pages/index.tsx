import { gql, useQuery } from '@apollo/client';
import { Member } from '@bikecoop/common';
import { Code } from '@chakra-ui/react';
import React from 'react';

const GET_MEMBERS = gql`
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

export default function Home() {
  const { data, error } = useQuery<Member[]>(GET_MEMBERS);

  if (error) {
    throw error;
  }

  return <Code> {JSON.stringify(data, null, 2)} </Code>;
}

import { Member } from '@bikecoop/common';
import { Code } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'urql';

const GET_MEMBERS = `
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
  const [{ data, error }] = useQuery<Member[]>({query: GET_MEMBERS});

  if (error) {
    throw error;
  }

  return <Code> {JSON.stringify(data, null, 2)} </Code>;
}

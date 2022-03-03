import { Member } from '@bikecoop/common';
import { Prism } from '@mantine/prism';
import React from 'react';
import { useQuery } from 'urql';

const GET_MEMBERS = `
  {
    getMembers {
      id
      email
    }
  }
`;

export default function Home(): JSX.Element {
  const [{ data, error }] = useQuery<Member[]>({ query: GET_MEMBERS });

  if (error) {
    throw error;
  }

  return <Prism language="json">{`${JSON.stringify(data, undefined, 2)}`}</Prism>;
}

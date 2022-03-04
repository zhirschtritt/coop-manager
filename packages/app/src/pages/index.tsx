import { Member } from '@bikecoop/common';
import { Button, Divider } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { gql } from 'graphql-request';
import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useGraphQLClient } from '../components/GraphQLClientProvider';

const GET_MEMBERS = gql`
  query {
    getMembers {
      firstName
      lastName
      id
      email
    }
  }
`;

export default function Home(): JSX.Element {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR<Member[]>(GET_MEMBERS);

  if (error) {
    throw error;
  }

  const client = useGraphQLClient();

  const newMember = () => {
    client.request(
      gql`
        mutation newMember($email: EmailAddress!) {
          newMember(member: { firstName: "zach", lastName: "foo", email: $email }) {
            firstName
          }
        }
      `,
      { email: `${Math.round(Math.random() * 100)}@email.com` }
    );
    mutate(GET_MEMBERS);
  };

  return (
    <>
      <Prism language="json">{`${JSON.stringify(data, undefined, 2)}`}</Prism>;<Divider />
      <Button onClick={newMember}>New Member</Button>
    </>
  );
}

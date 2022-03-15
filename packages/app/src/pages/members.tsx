import { Button, Container } from '@mantine/core';
import { gql } from 'graphql-request';
import React from 'react';
import { useSWRConfig } from 'swr';
import { useGraphQLClient } from '../components/GraphQLClientProvider';
import MemberListView from '../components/Members/MemberTable';
import { GET_ALL_MEMBERS } from '../graphql/members';

export default function Members(): JSX.Element {
  const { mutate } = useSWRConfig();

  const client = useGraphQLClient();
  const createNewMember = () => {
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
    mutate(GET_ALL_MEMBERS);
  };

  return (
    <>
      <Container mb={20}>
        <Button onClick={createNewMember}>Create new Member</Button>
      </Container>
      <MemberListView />
    </>
  );
}

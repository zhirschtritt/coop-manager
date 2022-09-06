import { Button, Container } from '@mantine/core';
import { gql } from 'graphql-request';
import React from 'react';
import { useSWRConfig } from 'swr';
import { useGraphQLClient } from '../providers/GraphQLClientProvider';
import MemberListView from '../components/Members/MemberTable';
import { GetAllMembersQuery } from '../components/Members/members.query';

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
    mutate(GetAllMembersQuery.query);
  };

  return (
    <>
      <Container>
        <Button onClick={createNewMember} my="md">
          Create new Member
        </Button>
        <MemberListView />
      </Container>
    </>
  );
}

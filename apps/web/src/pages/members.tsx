import { Button, Container } from '@mantine/core';
import { gql } from 'graphql-request';
import React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import useSWR, { useSWRConfig } from 'swr';

import Layout from '../components/Layout/layout';
import { GetAllMembersQuery } from '../components/Members/members.query';
import MemberListView from '../components/Members/MemberTable';
import { useGraphQLClient } from '../providers/GraphQLClientProvider';
import { NextPageWithLayout } from './_app';

const Members: NextPageWithLayout = () => {
  const { mutate } = useSWRConfig();

  const { data: members, error } = useSWR<Record<'getMembers', GetAllMembersQuery.Response[]>>(
    GetAllMembersQuery.query,
    {
      refreshInterval: 30_000,
    }
  );

  if (error) {
    throw error;
  }

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
    <Container>
      <Button onClick={createNewMember} my="md">
        Create new Member
      </Button>
      <MemberListView members={members?.getMembers ?? []} />
    </Container>
  );
};

export default Members;

Members.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <Layout>{page}</Layout>
    </SessionAuth>
  );
};

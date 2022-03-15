import { Member } from '@bikecoop/common';
import { Group } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { GET_ALL_MEMBERS } from '../../graphql/members';
import CustomTable from '../CustomTable';

export default function MemberListView(): JSX.Element {
  const { data: members, error } = useSWR<Record<'getMembers', Member[]>>(GET_ALL_MEMBERS);

  if (error) {
    throw error;
  }

  return (
    <Group position="center" direction="column" grow>
      <CustomTable<Member>
        columns={[
          {
            Header: 'Name',
            accessor: (m) => `${m.firstName} ${m.lastName}`,
          },
          { Header: 'Email', accessor: 'email' },
        ]}
        data={members?.getMembers || []}
      />
    </Group>
  );
}

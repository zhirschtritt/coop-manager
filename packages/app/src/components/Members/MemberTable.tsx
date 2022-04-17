import { Member } from '@bikecoop/common';
import { Paper } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { GET_ALL_MEMBERS } from './members.query';
import CustomTable from '../CustomTable';

export default function MemberListView(): JSX.Element {
  const { data: members, error } = useSWR<Record<'getMembers', Member[]>>(GET_ALL_MEMBERS, {
    refreshInterval: 30_000,
  });

  if (error) {
    throw error;
  }

  return (
    <Paper shadow="xs" padding="lg" style={{ overflowX: 'auto' }}>
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
    </Paper>
  );
}

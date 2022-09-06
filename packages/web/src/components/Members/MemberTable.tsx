import { Paper } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import CustomTable from '../CustomTable';
import { GetAllMembersQuery } from './members.query';
import MembershipBadge from './MembershipBadge';

export default function MemberListView(): JSX.Element {
  const { data: members, error } = useSWR<Record<'getMembers', GetAllMembersQuery.Response[]>>(
    GetAllMembersQuery.query,
    {
      refreshInterval: 30_000,
    }
  );

  if (error) {
    throw error;
  }

  return (
    <Paper shadow="md" style={{ overflowX: 'auto' }} radius="md">
      <CustomTable<GetAllMembersQuery.Response>
        columns={[
          {
            Header: 'Name',
            accessor: (m) => `${m.firstName} ${m.lastName}`,
          },
          { Header: 'Email', accessor: 'email' },
          {
            Header: 'Memberships',
            accessor: ({ memberships }) => memberships.map((m) => m.membershipType.level ?? ''),
            Cell: ({ value }: { value: string[] }) =>
              value.map((level, idx) => <MembershipBadge key={idx} level={level} />),
          },
        ]}
        data={members?.getMembers || []}
      />
    </Paper>
  );
}

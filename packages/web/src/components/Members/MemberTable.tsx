import { Paper } from '@mantine/core';
import React from 'react';
import CustomTable from '../CustomTable';
import { GetAllMembersQuery } from './members.query';
import MembershipBadge from './MembershipBadge';

export default function MemberListView({
  members,
}: {
  members: GetAllMembersQuery.Response[];
}): JSX.Element {
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
        data={members}
      />
    </Paper>
  );
}

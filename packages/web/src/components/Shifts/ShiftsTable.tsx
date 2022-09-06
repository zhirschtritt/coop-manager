import { Badge, Paper, Text } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { differenceInHours, format } from 'date-fns';
import CustomTable from '../CustomTable';
import { GetAllShiftsQuery } from './shifts.query';

export default function ShiftsTable(): JSX.Element {
  const { data: shifts, error } = useSWR<Record<'shifts', GetAllShiftsQuery.ShiftResponse[]>>(
    GetAllShiftsQuery.query,
    {
      refreshInterval: 30_000,
    }
  );

  if (error) {
    throw error;
  }

  return (
    <Paper shadow="md" style={{ overflowX: 'auto' }} radius="md">
      <CustomTable<GetAllShiftsQuery.ShiftResponse>
        columns={[
          {
            Header: 'Date',
            accessor: (s) => new Date(s.startsAt),
            Cell: ({ value }: { value: Date }) => <Text>{format(value, 'eeee, MMMM d, y')}</Text>,
          },
          {
            Header: 'Time',
            accessor: (s) =>
              `${format(new Date(s.startsAt), 'h:mm')} - ${format(
                new Date(s.endsAt),
                'h:mm'
              )} (${differenceInHours(new Date(s.startsAt), new Date(s.endsAt))} Hours)`,
          },
          {
            Header: 'Shift Assignments',
            accessor: (s) => s.shiftAssignments,
            Cell: ({ value }: { value: GetAllShiftsQuery.ShiftResponse['shiftAssignments'] }) =>
              value.map((sa) => <Badge key={sa.id}>{sa.member.firstName}</Badge>),
          },
        ]}
        data={shifts?.shifts || []}
      />
    </Paper>
  );
}

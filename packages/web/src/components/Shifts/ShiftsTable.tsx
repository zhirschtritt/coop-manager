import { Member } from '@bikecoop/common';
import { Avatar, Card, Group, Paper, Text, Tooltip } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';
import { differenceInHours, format } from 'date-fns';
import React from 'react';
import useSWR from 'swr';

import CustomTable from '../CustomTable';
import { GetAllShiftsQuery } from './shifts.query';

function MemberAvatar(props: { member: Pick<Member, 'firstName' | 'lastName'> }) {
  const { member } = props;
  return (
    <Tooltip withinPortal label={`${member.firstName} ${member.lastName}`} withArrow>
      <Avatar variant="light" radius="xl">
        {member.firstName[0]}
        {member.lastName[0]}
      </Avatar>
    </Tooltip>
  );
}

function MemberAvatarGroup({ members }: { members: Pick<Member, 'firstName' | 'lastName'>[] }) {
  return (
    <Avatar.Group>
      {members.map((m) => (
        <MemberAvatar member={m} />
      ))}
    </Avatar.Group>
  );
}

function AssignmentsForSlot({
  slots,
}: {
  slots: GetAllShiftsQuery.ShiftResponse['slots'];
}): JSX.Element {
  return (
    <Group align="flex-start">
      {slots.map((slot) => (
        <Card shadow="sm" p="md" radius="md">
          <Card.Section p="4px" withBorder>
            <Text weight={300}>{slot.name}</Text>
          </Card.Section>
          <Card.Section>
            {slot.shiftAssignments.length ? (
              <MemberAvatarGroup members={slot.shiftAssignments.map((s) => s.member)} />
            ) : (
              <Avatar variant="light" radius="xl">
                <IconCirclePlus />
              </Avatar>
            )}
          </Card.Section>
        </Card>
      ))}
    </Group>
  );
}

export default function ShiftsTable(): JSX.Element {
  const { data: shiftResponse, error } = useSWR<
    Record<'shifts', GetAllShiftsQuery.ShiftResponse[]>
  >(GetAllShiftsQuery.query, {
    refreshInterval: 30_000,
  });

  if (error) {
    throw error;
  }

  return (
    <Paper shadow="md" style={{ overflowX: 'auto' }} radius="md">
      <CustomTable<GetAllShiftsQuery.ShiftResponse>
        data={shiftResponse?.shifts || []}
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
              )} (${differenceInHours(new Date(s.endsAt), new Date(s.startsAt))} Hours)`,
          },
          {
            Header: 'Shift Assignments',
            accessor: (s) => s.slots,
            Cell: ({ value: slots }: { value: GetAllShiftsQuery.ShiftResponse['slots'] }) => (
              <AssignmentsForSlot slots={slots} />
            ),
          },
        ]}
      />
    </Paper>
  );
}

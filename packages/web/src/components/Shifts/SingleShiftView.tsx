import { Card, Text, Stack, Group, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { format } from 'date-fns';
import { SlotAssignmentsView } from './ShiftAssignmentsView';

import { GetAllShiftsQuery } from './shifts.query';

function timeWithAmPm(stringyDate: string | Date) {
  return format(new Date(stringyDate), 'h:mmaaa');
}

export default function SingleShiftView({
  shift: s,
}: {
  shift: GetAllShiftsQuery.ShiftResponse;
}): JSX.Element {
  const unfulfilled = s.slots.some(
    (slot) => slot.shiftAssignments.length < (slot.data.minInstances ?? 0)
  );
  const largeScreen = useMediaQuery('(min-width: 400px)');

  const unfulfilledBadge =
    unfulfilled && largeScreen ? (
      <Badge radius="xs" color="red" variant="dot">
        Unfulfilled
      </Badge>
    ) : null;

  return (
    <Card shadow="xs" p="lg" radius="md" maw={750} miw={275}>
      <Card.Section p="sm">
        <Stack style={{ gap: 0 }}>
          <Group align="start" position="apart" spacing="xs">
            <Text fw={500}>{format(new Date(s.startsAt), 'eeee, MMMM d, y')}</Text>
            {unfulfilledBadge}
          </Group>
          <Text fz="xs">{`${timeWithAmPm(s.startsAt)} - ${timeWithAmPm(s.endsAt)}`}</Text>
        </Stack>
      </Card.Section>
      <Card.Section>
        <SlotAssignmentsView slots={s.slots} />
      </Card.Section>
    </Card>
  );
}

import { Badge, Box, Flex, ScrollArea } from '@mantine/core';
import React from 'react';

import { MemberAvatarGroup } from '../Members/MemberAvatar';
import { GetAllShiftsQuery } from './shifts.query';

function SlotView({
  slot,
}: {
  slot: GetAllShiftsQuery.ShiftResponse['slots'][number];
}): JSX.Element {
  const unfulfilled = slot.shiftAssignments.length < (slot.data.minInstances ?? 0);

  return (
    <Box p="xs">
      <Badge color={unfulfilled ? 'red' : 'blue'} variant="light">
        {slot.name}
      </Badge>
      <MemberAvatarGroup members={slot.shiftAssignments.map((s) => s.member)} />
    </Box>
  );
}
export function SlotAssignmentsView({
  slots,
}: {
  slots: GetAllShiftsQuery.ShiftResponse['slots'];
}): JSX.Element {
  return (
    <ScrollArea type="scroll">
      <Flex direction="row" align="flex-start">
        {slots.map((slot) => (
          <SlotView key={slot.name} slot={slot} />
        ))}
      </Flex>
    </ScrollArea>
  );
}

import { Stack } from '@mantine/core';
import useSWR from 'swr';
import { GetAllShiftsQuery } from './shifts.query';
import SingleShiftView from './SingleShiftView';

export default function AllShiftsView(): JSX.Element {
  const { data: shiftResponse, error } = useSWR<
    Record<'shifts', GetAllShiftsQuery.ShiftResponse[]>
  >(GetAllShiftsQuery.query, {
    refreshInterval: 30_000,
  });

  if (error) {
    throw error;
  }

  return (
    <Stack spacing="xs">
      {shiftResponse?.shifts.map((shift) => (
        <SingleShiftView key={shift.id} shift={shift} />
      ))}
    </Stack>
  );
}

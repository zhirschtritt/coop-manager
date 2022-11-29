import { Affix, Button, Container, Stack, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons';
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

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Container p={0} maw={750}>
      <Stack spacing="xs" align="stretch" justify="center">
        {shiftResponse?.shifts.map((shift) => (
          <SingleShiftView key={shift.id} shift={shift} />
        ))}
      </Stack>
      <Affix position={{ bottom: 10, right: 10 }}>
        <Transition transition="slide-up" mounted={scroll.y > 1000}>
          {(transitionStyles) => (
            <Button
              size="xs"
              leftIcon={<IconArrowUp size={14} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Back to top
            </Button>
          )}
        </Transition>
      </Affix>
    </Container>
  );
}

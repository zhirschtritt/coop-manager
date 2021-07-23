import { useQuery } from 'urql';
import { Shift } from '@bikecoop/common';
import { Container, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { add, sub } from 'date-fns';
import { GET_SHIFTS_IN_RANGE } from '../queries';

const now = new Date();

export default function Shifts() {
  const [{data, error}] = useQuery<{ getShifts: Shift[] }>({
    query: GET_SHIFTS_IN_RANGE,
      variables: {
        from: sub(now, { days: 90 }).toISOString(),
        to: add(now, { days: 90 }).toISOString(),
      },
    },
  );

  if (error) {
    throw error;
  }

  return (
    <Container maxW="full">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Starts At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.getShifts.map((shift: Shift) => (
            <Tr key={shift.id}>
              <Td>{shift.id}</Td>
              <Td>{shift.startsAt}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}

import { Container, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { sub, add } from 'date-fns';
import React, { useMemo } from 'react';
import { useTable, Column, useSortBy } from 'react-table';
import { useQuery } from 'urql';
import { GetShiftsQuery } from '../queries';

export default function Shifts() {
  const now = useMemo(() => new Date(), []);

  const [{ data, error }] = useQuery<{
    getShifts: GetShiftsQuery.ShiftWithMembers[];
  }>({
    query: GetShiftsQuery.query,
    variables: {
      from: sub(now, { days: 90 }).toISOString(),
      to: add(now, { days: 90 }).toISOString(),
    },
    requestPolicy: 'cache-first',
  });

  if (error) {
    throw error;
  }

  const columns = useMemo<Column<GetShiftsQuery.ShiftWithMembers>[]>(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Starts At', accessor: 'startsAt' },
      { Header: 'Ends At', accessor: 'endsAt' },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: data?.getShifts ?? [] }, useSortBy);

  return (
    <Container maxW="full">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
}

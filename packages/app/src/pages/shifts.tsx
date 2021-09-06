import {
  Avatar,
  Container,
  Table,
  Tag,
  TagLabel,
  TagRightIcon,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MdMoreVert } from 'react-icons/md';
import { sub, add, format } from 'date-fns';
import React, { useMemo } from 'react';
import { useTable, Column, useSortBy, CellProps } from 'react-table';
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

  type ShiftCellProps = CellProps<GetShiftsQuery.ShiftWithMembers>;

  const columns = useMemo<Column<GetShiftsQuery.ShiftWithMembers>[]>(
    () => [
      {
        Header: 'Starts At',
        accessor: 'startsAt',
        Cell: ({ row }: ShiftCellProps) => (
          <>{format(new Date(row.values.startsAt), 'PP pp')}</>
        ),
      },
      {
        Header: 'Ends At',
        accessor: 'endsAt',
        Cell: ({ row }: ShiftCellProps) => (
          <>{format(new Date(row.values.endsAt), 'PP pp')}</>
        ),
      },
      {
        Header: 'Staff',
        accessor: 'getMembers',
        Cell: ({ row }: ShiftCellProps) => (
          <>
            {row.values.getMembers?.map(
              (m: GetShiftsQuery.ShiftWithMembers['getMembers'][number]) => (
                <Tag size="lg" colorScheme="green" borderRadius="full">
                  <Avatar
                    name={m.firstName}
                    size="xs"
                    ml="-1"
                    mr="2"
                    bgColor="green"
                  />
                  <TagLabel>{m.firstName}</TagLabel>
                  <TagRightIcon as={MdMoreVert} />
                </Tag>
              ),
            )}
          </>
        ),
      },
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

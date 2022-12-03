import React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import useSWR from 'swr';

import Layout from '../components/Layout/layout';
import AllShiftsView from '../components/Shifts/AllShiftsView';
import { GetAllShiftsQuery } from '../components/Shifts/shifts.query';
import { NextPageWithLayout } from './_app';

export default function Shifts() {
  const { data, error } = useSWR<Record<'shifts', GetAllShiftsQuery.ShiftResponse[]>>(
    GetAllShiftsQuery.query,
    {
      refreshInterval: 30_000,
    }
  );

  if (error) {
    throw error;
  }

  return <AllShiftsView shifts={data?.shifts ?? []} />;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const S: NextPageWithLayout = Shifts;

Shifts.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <SessionAuth>
      <Layout>{page}</Layout>
    </SessionAuth>
  );
};

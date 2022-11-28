import React from 'react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import AllShiftsView from '../components/Shifts/AllShiftsView';
// import ShiftsTable from '../components/Shifts/ShiftsTable';

export default function Members(): JSX.Element {
  return (
    <SessionAuth>
      <AllShiftsView />
    </SessionAuth>
  );
}

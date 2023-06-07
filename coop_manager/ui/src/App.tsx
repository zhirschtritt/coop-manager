import './App.css';

import { useState } from 'react';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';
import {CoopShiftService} from './generated/coop_manager/v1/coop_manager_connect'
import {createPromiseClient} from '@bufbuild/connect';
import {createConnectTransport} from '@bufbuild/connect-web';

function App() {
  const [count, setCount] = useState(0);

  const client = createPromiseClient(CoopShiftService, createConnectTransport({baseUrl: '/api'}))
  
  
  async function assignShift() {
    const shift = await client.assignShift({})
    console.log(shift)
  }

  return (
    <>
      <div>
        <button onClick={assignShift}>ASSIGN SHIFT</button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;

import './index.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';

const Foo = function Foo() {
  return <>HI</>;
};

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <Foo />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

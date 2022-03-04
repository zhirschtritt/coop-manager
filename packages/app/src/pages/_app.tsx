import { GlobalStyles, MantineProvider, NormalizeCSS } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { AppProps } from 'next/app';
import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import Layout from './layout';
import GraphQLClientProvider from '../components/GraphQLClientProvider';

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, unknown> & {
    getLayout(e: JSX.Element): JSX.Element;
  };
}): JSX.Element {
  return (
    <MantineProvider
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <NormalizeCSS />
      <GlobalStyles />
      <GraphQLClientProvider>
        <NotificationsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationsProvider>
      </GraphQLClientProvider>
    </MantineProvider>
  );
}

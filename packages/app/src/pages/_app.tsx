import { GlobalStyles, MantineProvider, NormalizeCSS } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { AppProps } from 'next/app';
import React from 'react';

import { createClient, defaultExchanges, Provider as GraphQLProvider } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { NextComponentType, NextPageContext } from 'next';
import { refocusExchange } from '@urql/exchange-refocus';
import Layout from './layout';

const client = createClient({
  url: process.env.GRAPHQL_URL || 'http://localhost:5020/graphql',
  exchanges: [...defaultExchanges, devtoolsExchange, refocusExchange()],
});

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
      <GraphQLProvider value={client}>
        <NotificationsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationsProvider>
      </GraphQLProvider>
    </MantineProvider>
  );
}

import { GlobalStyles, MantineProvider, NormalizeCSS } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { AppProps } from 'next/app';
import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import GraphQLClientProvider from '../components/GraphQLClientProvider';
import Layout from '../components/Layout/Layout';

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

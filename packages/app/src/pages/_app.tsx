import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { AppProps } from 'next/app';
import React from 'react';

import { NextComponentType, NextPageContext } from 'next';
import GraphQLClientProvider from '../providers/GraphQLClientProvider';
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
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
      }}
    >
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

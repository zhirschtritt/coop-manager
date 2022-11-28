import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { AppProps } from 'next/app';
import React from 'react';

import { NextComponentType, NextPageContext } from 'next';

import Layout from '../components/Layout/Layout';
import GraphQLClientProvider from '../providers/GraphQLClientProvider';
import { frontendConfig } from '../config/supertokensConfig';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  console.log('supertokens init');
  SuperTokensReact.init(frontendConfig());
}

const theme: any = {
  colorScheme: 'light',
  breakpoints: {
    xs: 500,
    sm: 800,
    md: 1000,
    lg: 1200,
    xl: 1400,
  },
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, unknown> & {
    getLayout(e: JSX.Element): JSX.Element;
  };
}): JSX.Element {
  return (
    <SuperTokensWrapper>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <GraphQLClientProvider>
          <NotificationsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </GraphQLClientProvider>
      </MantineProvider>
    </SuperTokensWrapper>
  );
}

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';

import { frontendConfig } from '../config/supertokensConfig';
import GraphQLClientProvider from '../providers/GraphQLClientProvider';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
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

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SuperTokensWrapper>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <GraphQLClientProvider>
          <NotificationsProvider>{getLayout(<Component {...pageProps} />)}</NotificationsProvider>
        </GraphQLClientProvider>
      </MantineProvider>
    </SuperTokensWrapper>
  );
}

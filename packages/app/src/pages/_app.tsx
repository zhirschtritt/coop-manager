import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';

import {
  createClient,
  defaultExchanges,
  Provider as GraphQLProvider,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { NextComponentType, NextPageContext } from 'next';

const client = createClient({
  url: process.env.GRAPHQL_URL || 'http://localhost:5000/graphql',
  exchanges: [devtoolsExchange, ...defaultExchanges],
});

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, unknown> & {
    getLayout(e: JSX.Element): JSX.Element;
  };
}) {
  const getLayout = Component.getLayout ?? ((page) => <> {page} </>);

  return (
    <ChakraProvider>
      <GraphQLProvider value={client}>
        {getLayout(<Component {...pageProps} />)}
      </GraphQLProvider>
    </ChakraProvider>
  );
}

export default MyApp;

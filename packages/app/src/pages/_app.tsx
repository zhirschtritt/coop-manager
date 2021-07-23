import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';

import {createClient, Provider as GraphQLProvider} from 'urql'

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GraphQLProvider value={client}>
        <Component {...pageProps} />
      </GraphQLProvider>
    </ChakraProvider>
  );
}

export default MyApp;

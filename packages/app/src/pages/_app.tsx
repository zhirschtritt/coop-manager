import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;

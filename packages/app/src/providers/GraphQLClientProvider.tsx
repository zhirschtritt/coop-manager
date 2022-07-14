import React, { createContext, PropsWithChildren, useContext } from 'react';
import { SWRConfig } from 'swr';
import createFetcher from '../lib/graphql-fetcher';

type FetcherCtx = ReturnType<typeof createFetcher>;
export const GraphQLContext = createContext<FetcherCtx>({} as FetcherCtx);

export function useGraphQLClient() {
  const { client } = useContext(GraphQLContext);

  if (!client) {
    throw new Error('Using GraphQLContext outside of GraphQLClientProvider');
  }

  return client;
}

export default function GraphQLClientProvider({ children }: PropsWithChildren<any>): JSX.Element {
  const { fetcher, client } = createFetcher();

  return (
    <GraphQLContext.Provider value={{ fetcher, client }}>
      <SWRConfig
        value={{
          refreshInterval: 5000,
          fetcher,
        }}
      >
        {children}
      </SWRConfig>
    </GraphQLContext.Provider>
  );
}

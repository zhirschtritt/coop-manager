import { SWRConfiguration } from 'swr';
import { GraphQLClient } from 'graphql-request';

type Fetcher = NonNullable<SWRConfiguration['fetcher']>;

export default function createFetcher(): { client: GraphQLClient; fetcher: Fetcher } {
  const graphQLClient = new GraphQLClient(
    process.env.GRAPHQL_URL || 'http://localhost:5020/graphql'
    // {
    //   headers: {
    //     authorization: 'Bearer MY_TOKEN',
    //   },
    // }
  );

  return {
    client: graphQLClient,
    fetcher: async (args: any[] | string) => {
      let $query: string;
      let $variables: Record<string, unknown> | undefined;

      if (Array.isArray(args)) {
        [$query, $variables] = args;
      } else {
        $query = args;
      }

      return graphQLClient.request($query, $variables);
    },
  };
}

import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const userClient = new ApolloClient({
  uri: 'http://localhost:3002/',
  cache: new InMemoryCache(),
});

export default userClient;

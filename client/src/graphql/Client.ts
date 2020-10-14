import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql';

// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   cache: new InMemoryCache(),
// });

// const query = gql`{}`;

const link = new HttpLink({
  uri: 'http://localhost:3002/'
})
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
})

export default client;
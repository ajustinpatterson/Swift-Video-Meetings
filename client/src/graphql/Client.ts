import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({ uri: 'http://localhost:3002/graphql' })

export const userClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});



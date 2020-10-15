import { ApolloClient, InMemoryCache } from '@apollo/client';
import gql from 'graphql';

const userClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query GetAllUsers {
    getUsers {
      id
      email
      familyName
      givenName
      googleId
      imageUrl
      name
    }
  }
`;

const CREATE_USER = gql`
mutation AddAUser(_: any, $newUser: CreateUserInput) {
  createUser(input: $newUser) {
    email
    familyName
    givenName
    googleId
    imageUrl
    name
  }
}
`;

const UPDATE_USER = gql`
  mutation UpdateUser($input: userDetails) {
    updateUser(input: $input) {
      email
      familyName
      givenName
      googleId
      imageUrl
      name
    }
  }
`;

const UPDATE_EMAIL = gql`
mutation UpdateEmail() {
  updateEmail() {
    email
    familyName
    givenName
    googleId
    imageUrl
    name
  }
}
`;

export default userClient;

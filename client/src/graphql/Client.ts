import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const userClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

export const GET_USERS = gql`
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

export const CREATE_USER = gql`
  mutation AddAUser($newUser: CreateUserInput) {
    createUser(userDetails: $newUser) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($input: MutationUpdateUser) {
    updateUser(input: userDetails) {
      id
      email
      familyName
      givenName
      googleId
      imageUrl
      name
      bio
      status
    }
  }
`;

export const UPDATE_EMAIL = gql`
mutation UpdateEmail($input: MutationUpdateEmail) {
  updateEmail({id, email}: $input) {
    id
    email
  }
}
`;

export const DELETE_USER = gql`
  mutation DeleteUser($input: MutationDeleteUser) {
    deleteUser(id: $input) {
      id
    }
  }
`;

export default userClient;

import { gql, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const userClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3002/graphql',
  }),
  cache: new InMemoryCache(),
});

export const GET_USERS = gql`
  query GetAllUsers {
    getUsers {
      _id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userDetails: CreateUserInput!) {
    createUser(userDetails: $userDetails) {
      email
      familyName
      givenName
      googleId
      imageUrl
      name
    }
  }
`;

// export const UPDATE_USER = gql`
//   mutation UpdateUser($input: MutationUpdateUser) {
//     updateUser(input: userDetails) {
//       id
//       email
//       familyName
//       givenName
//       googleId
//       imageUrl
//       name
//       bio
//       status
//     }
//   }
// `;

// export const UPDATE_EMAIL = gql`
// mutation UpdateEmail($input: MutationUpdateEmail) {
//   updateEmail({id, email}: $input) {
//     id
//     email
//   }
// }
// `;

// export const DELETE_USER = gql`
//   mutation DeleteUser($input: MutationDeleteUser) {
//     deleteUser(id: $input) {
//       id
//     }
//   }
// `;

export default userClient;

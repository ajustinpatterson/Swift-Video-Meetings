<<<<<<< HEAD
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// import gql from 'graphql';

// // const client = new ApolloClient({
// //   uri: 'https://48p1r2roz4.sse.codesandbox.io',
// //   cache: new InMemoryCache(),
// // });

// // const query = gql`{}`;

// const link = new HttpLink({
//   uri: 'http://localhost:3002/'
// })
// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   link,
//   cache
// })

// export default client;


import { ApolloClient, InMemoryCache } from '@apollo/client';
import gql from 'graphql';
const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});
// const query = gql`{}`;
export default client;
=======
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const userClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

// export const GET_USERS = gql`
//   query GetAllUsers {
//     getUsers {
//       id
//       email
//       familyName
//       givenName
//       googleId
//       imageUrl
//       name
//     }
//   }
// `;

// export const CREATE_USER = gql`
//   mutation AddAUser($newUser: CreateUserInput) {
//     createUser(userDetails: $newUser) {
//       id
//       email
//       familyName
//       givenName
//       googleId
//       imageUrl
//       name
//     }
//   }
// `;

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
>>>>>>> ff9872cda900a8370b7509e0e10beddb9d335bef

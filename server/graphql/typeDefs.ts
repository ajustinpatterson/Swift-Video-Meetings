import { gql } from 'apollo-server-express';

const typeDefs = gql `

  schema {
    query: Query
    mutation: Mutation
  }

  scalar EmailAddress
  scalar UUID

  type User {
    id: String!
    name: String!
    email: String!
    bio: String
    avatar: String
  }

  type Query {
    getUsers: [User]!
  }

  input CreateUserInput {
    id: String!
    name: String!
    email: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    deleteUser(id: String!): User!
    updateName(id: String!, email: String!): User!
    updateEmail(id: String!, email: String!): User!
    updateBio(id: String!, bio: String!): User!
    updateAvatar(id: String!, avatar: String!): User!

  }
`

export { typeDefs };
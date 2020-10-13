import { gql } from 'apollo-server-express';

const typeDefs = gql `

  schema {
    query: Query
    mutation: Mutation
  }

  scalar EmailAddress
  scalar UUID

  type User {
    id: ID!
    name: String!
    email: EmailAddress!
    bio: String
    avatar: String
  }

  type Query {
    getUsers: [User]!
  }

  input CreateUserInput {
    name: String!
    email: EmailAddress!
    bio: String
    avatar: String
  }

  input UpdateUserInput {
    id: ID
    name: String
    email: EmailAddress
    bio: String
    avatar: String
  }

  type Mutation {
    createUser(userDetails: CreateUserInput!): User!
    updateEmail(id: ID!, email: String!): User!
    deleteUser(id: ID!): User!
    updateUser(userDetails: UpdateUserInput!): User!
  }
`

export { typeDefs };
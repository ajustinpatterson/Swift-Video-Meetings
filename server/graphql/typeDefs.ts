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
    email: String!
    bio: String
    avatar: String
  }

  type Query {
    getUsers: [User]!
  }

  input CreateUserInput {
    id: ID!
    name: String!
    email: String!
    bio: String
    avatar: String
  }

  type Mutation {
    createUser(userDetails: CreateUserInput!): User!
    updateEmail(id: ID!, email: String!): User!
  }
`

export { typeDefs };
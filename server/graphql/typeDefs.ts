import { gql } from 'apollo-server-express';

const typeDefs = gql `

  schema {
    query: Query
    mutation: Mutation
  }

  scalar EmailAddress
  scalar UUID

  type User {
    id: UUID!
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
    id: UUID
    name: String
    email: EmailAddress
    bio: String
    avatar: String
  }

  type Mutation {
    createUser(userDetails: CreateUserInput!): User!
    updateEmail(id: UUID!, email: EmailAddress!): User!
    deleteUser(id: UUID!): User!
    updateUser(userDetails: UpdateUserInput!): User!
  }
`

export { typeDefs };
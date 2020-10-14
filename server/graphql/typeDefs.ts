import { gql } from 'apollo-server-express';

const typeDefs = gql `

  schema {
    query: Query
    mutation: Mutation
  }

  scalar UUID

  type User {
    id: UUID!
    name: String!
    bio: String
    avatar: String
    status: String
  }

  input CreateUserInput {
    name: String!
    bio: String
    avatar: String
    status: String
  }

  input UpdateUserInput {
    id: UUID!
    name: String
    bio: String
    avatar: String
    status: String
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    createUser(userDetails: CreateUserInput!): User!
    deleteUser(id: UUID!): User!
    updateUser(userDetails: UpdateUserInput!): User!
  }
`

export { typeDefs };
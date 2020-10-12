import { gql } from 'apollo-server-express';

const typeDefs = gql `
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

  input CreateUser {
    id: String!
    name: String!
    email: String!
  }

  type Mutation {
    createUser(input: CreateUser): User!
    updateUser(id: Int!): User!
    deleteUser(id: Int!): User!
  }
`

module.exports = typeDefs;
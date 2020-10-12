import { gql } from 'apollo-server-express';

const typeDefs = gql `
  type User {
    int: Int!
    name: String!
    email: String!
    bio: String
    avatar: String
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    createUser(id: Int!): User!
    updateUser(id: Int!): User!
    deleteUser(id: Int!): User!
  }
`

module.exports = typeDefs;
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
    deleteUser(id: Int!): User!
    updateName(id: Int!): User!
    updateEmail(id: Int!): User!
    updateBio(id: Int!): User!
    updateAvatar(id: Int!): User!
  }
`

module.exports = typeDefs;
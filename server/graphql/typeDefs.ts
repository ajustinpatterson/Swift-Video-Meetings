import { gql } from 'apollo-server-express';

const typeDefs = gql `

  scalar EmailAddress

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
    id: ID!
    name: String!
    email: EmailAddress!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    updateName(id: ID!, name: String!): User!
    updateEmail(id: ID!, email: EmailAddress!): User!
    updateBio(id: ID!, bio: String!): User!
    updateAvatar(id: ID!, avatar: String!): User!
  }
`

export { typeDefs };
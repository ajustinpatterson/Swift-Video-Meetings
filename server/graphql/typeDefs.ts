import { gql } from 'apollo-server-express';

const typeDefs = gql `

  schema {
    query: Query
    mutation: Mutation
  }

  scalar UUID
  scalar EmailAddress

  type User {
    id: UUID!
    name: String!
    email: EmailAddress!
    token: String!
    bio: String
    avatar: String
    status: String
  }

  type NewUser {
    email: EmailAddress!
    familyName: String!
    givenName: String!
    googleId: String!
    imageUrl: String!
    name: String!
  }

  input CreateUserInput {
    email: EmailAddress!
    familyName: String!
    givenName: String!
    googleId: String!
    imageUrl: String!
    name: String!
  }

  input UpdateUserInput {
    id: UUID!
    name: String
    email: EmailAddress!
    token: String!
    bio: String
    avatar: String
    status: String
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    createUser(userDetails: CreateUserInput!): NewUser!
    deleteUser(id: UUID!): User!
    updateUser(userDetails: UpdateUserInput!): User!
  }
`

export { typeDefs };
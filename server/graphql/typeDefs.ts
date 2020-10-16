import { gql } from 'apollo-server-express';

const typeDefs = gql `

  schema {
    query: Query
    mutation: Mutation
  }

  scalar UUID
  scalar EmailAddress

  type User {
    _id: UUID!
    email: EmailAddress!
    familyName: String!
    givenName: String!
    googleId: String!
    imageUrl: String!
    name: String!
    bio: String
    avatar: String
    status: String
  }

  type NewUser {
    _id: String!
    email: EmailAddress!
    familyName: String!
    givenName: String!
    googleId: String!
    imageUrl: String!
    name: String!
  }

  input CreateUserInput {
    email: String!
    familyName: String!
    givenName: String!
    googleId: String!
    imageUrl: String!
    name: String!
  }

  input UpdateUserInput {
    _id: UUID!
    email: EmailAddress
    familyName: String
    givenName: String
    googleId: String
    imageUrl: String
    name: String
    bio: String
    avatar: String
    status: String
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    createUser(userDetails: CreateUserInput!): NewUser!
    deleteUser(_id: UUID!): User!
    updateUser(userDetails: UpdateUserInput!): User!
  }
`

export { typeDefs };
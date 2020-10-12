import { gql } from 'apollo-server-express';

const typeDefs = gql `
  type User {
    name: String!
    email: String!
    bio: String
    avatar: String
  }

  type Query {

  }
`

module.exports = typeDefs;
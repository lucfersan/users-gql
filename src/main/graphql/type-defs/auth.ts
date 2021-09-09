import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    login (username: String!, password: String!): UserWithToken!
  }

  type UserWithToken {
    id: ID!
    firstName: String!
    token: String!
  }
`

import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    addUser (firstName: String!, lastName: String!, username: String!, age: Int!, password: String!): User!
  }

  type User {
    id: ID!
    firstName: String!
    username: String!
  }
`

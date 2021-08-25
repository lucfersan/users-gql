import { ApolloServer, gql } from 'apollo-server-express'

import prisma from '@/infra/prisma/client'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases'
import { makeApolloServer } from '@/tests/main/graphql/mocks'

describe('Users GraphQL', () => {
  let apolloServer: ApolloServer

  beforeAll(async () => {
    apolloServer = makeApolloServer()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('addUser Mutation', () => {
    const addUserMutation = gql`
      mutation (
        $firstName: String!
        $lastName: String!
        $username: String!
        $age: Int!
        $password: String!
      ) {
        addUser(
          firstName: $firstName
          lastName: $lastName
          username: $username
          age: $age
          password: $password
        ) {
          id
          firstName
          username
        }
      }
    `

    it('should add a user', async () => {
      const params = mockAddUserParams()
      const res = await apolloServer.executeOperation({
        query: addUserMutation,
        variables: params
      })
      expect(res.errors).toBeUndefined()
      expect(res.data?.addUser.id).toBeDefined()
      expect(res.data?.addUser.firstName).toBe(params.firstName)
      expect(res.data?.addUser.username).toBe(params.username)
    })

    it('should return a UsernameInUseError if username is already in use', async () => {
      const params = mockAddUserParams()
      await prisma.user.create({
        data: params
      })
      const res = await apolloServer.executeOperation({
        query: addUserMutation,
        variables: params
      })
      expect(res.data).toBeFalsy()
      expect(res.errors?.[0].message).toBe('The username provided is already in use.')
    })
  })
})

import { ApolloServer, gql } from 'apollo-server-express'
import { hash } from 'bcrypt'

import prisma from '@/infra/prisma/client'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases'
import { makeApolloServer } from '@/tests/main/graphql/mocks'

describe('Auth GraphQL', () => {
  let apolloServer: ApolloServer

  beforeAll(async () => {
    apolloServer = makeApolloServer()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('login Query', () => {
    const loginQuery = gql`
      query ($username: String!, $password: String!) {
        login (username: $username, password: $password) {
          id
          firstName
          token
        }
      }
    `

    it('should login a user', async () => {
      const params = mockAddUserParams()
      const { id, firstName } = await prisma.user.create({
        data: {
          ...params,
          password: await hash(params.password, 12)
        }
      })
      const res = await apolloServer.executeOperation({
        query: loginQuery,
        variables: {
          username: params.username,
          password: params.password
        }
      })
      expect(res.errors).toBeUndefined()
      expect(res.data?.login.id).toBe(id)
      expect(res.data?.login.firstName).toBe(firstName)
      expect(res.data?.login.token).toBeDefined()
    })

    it('should return a AuthenticationError if username or password is incorrect', async () => {
      const params = mockAddUserParams()
      await prisma.user.create({
        data: params
      })
      const res = await apolloServer.executeOperation({
        query: loginQuery,
        variables: params
      })
      expect(res.data).toBeFalsy()
      expect(res.errors?.[0].message).toBe('The username or password provided is incorrect.')
    })
  })
})

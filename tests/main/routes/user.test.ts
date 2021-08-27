import request from 'supertest'

import prisma from '@/infra/prisma/client'
import { app } from '@/main/config/app'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases'

describe('User Routes', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /users', () => {
    it('should add a user', async () => {
      const params = mockAddUserParams()
      const { statusCode, body } = await request(app)
        .post('/api/users')
        .send(params)
      expect(statusCode).toBe(201)
      expect(body.id).toBeDefined()
      expect(body.firstName).toBe(params.firstName)
      expect(body.username).toBe(params.username)
    })
  })

  describe('GET /users', () => {
    it('should get all users', async () => {
      await prisma.user.createMany({
        data: [mockAddUserParams(), mockAddUserParams()]
      })
      const { statusCode, body } = await request(app)
        .get('/api/users')
      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          username: true
        }
      })
      expect(statusCode).toBe(200)
      expect(body).toEqual(users)
    })
  })
})

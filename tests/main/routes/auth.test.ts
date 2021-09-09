import { hash } from 'bcrypt'
import request from 'supertest'

import prisma from '@/infra/prisma/client'
import { app } from '@/main/config/app'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases'

describe('User Routes', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('POST /login', () => {
    it('should login a user', async () => {
      const params = mockAddUserParams()
      const { id, firstName } = await prisma.user.create({
        data: {
          ...params,
          password: await hash(params.password, 12)
        }
      })
      const { statusCode, body } = await request(app)
        .post('/api/login')
        .send({
          username: params.username,
          password: params.password
        })
      expect(statusCode).toBe(200)
      expect(body.id).toBe(id)
      expect(body.firstName).toBe(firstName)
      expect(body.token).toBeDefined()
    })
  })
})

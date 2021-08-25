import request from 'supertest'

import { app } from '@/main/config/app'

describe('User Routes', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      await request(app)
        .post('/api/users')
        .send()
        .expect(200)
    })
  })
})

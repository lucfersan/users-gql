import bcrypt from 'bcrypt'
import faker from 'faker'

import { BcryptAdapter } from '@/infra/crypto'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let salt: number

  beforeAll(() => {
    salt = 12
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
  })

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  describe('hash', () => {
    let plaintext: string

    beforeAll(() => {
      plaintext = faker.internet.password()
    })

    it('should call hash with correct values', async () => {
      await sut.hash({ plaintext })
      expect(fakeBcrypt.hash).toHaveBeenCalledWith(plaintext, salt)
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1)
    })
  })
})

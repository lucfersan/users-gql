import bcrypt from 'bcrypt'
import faker from 'faker'

import { BcryptAdapter } from '@/infra/crypto'
import { throwError } from '@/tests/domain/mocks'

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
    let fakeDigest: string

    beforeAll(() => {
      plaintext = faker.internet.password()
      fakeDigest = faker.datatype.uuid()
      fakeBcrypt.hash.mockImplementation(() => fakeDigest)
    })

    it('should call hash with correct values', async () => {
      await sut.hash({ plaintext })
      expect(fakeBcrypt.hash).toHaveBeenCalledWith(plaintext, salt)
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1)
    })

    it('should throw if hash throws', async () => {
      jest.spyOn(fakeBcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash({ plaintext })
      await expect(promise).rejects.toThrow()
    })

    it('should return a digest on hash success', async () => {
      const digest = await sut.hash({ plaintext })
      expect(digest).toBe(fakeDigest)
    })
  })
})

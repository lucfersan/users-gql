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

  describe('compare', () => {
    let plaintext: string
    let digest: string

    beforeAll(() => {
      plaintext = faker.internet.password()
      digest = faker.datatype.uuid()
      fakeBcrypt.compare.mockImplementation(() => true)
    })

    it('should call compare with correct values', async () => {
      await sut.compare({ plaintext, digest })
      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plaintext, digest)
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1)
    })

    it('should throw if compare throws', async () => {
      jest.spyOn(fakeBcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare({ plaintext, digest })
      await expect(promise).rejects.toThrow()
    })

    it('should return a false on compare failure', async () => {
      jest.spyOn(fakeBcrypt, 'compare').mockImplementationOnce(() => false)
      const isValid = await sut.compare({ plaintext, digest })
      expect(isValid).toBe(false)
    })

    it('should return a true on compare success', async () => {
      const isValid = await sut.compare({ plaintext, digest })
      expect(isValid).toBe(true)
    })
  })
})

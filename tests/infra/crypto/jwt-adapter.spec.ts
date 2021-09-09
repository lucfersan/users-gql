import faker from 'faker'
import jwt from 'jsonwebtoken'

import { JwtAdapter } from '@/infra/crypto'
import { throwError } from '@/tests/domain/mocks'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let fakeJwt: jest.Mocked<typeof jwt>
  let secret: string

  beforeAll(() => {
    secret = faker.random.alphaNumeric()
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })

  describe('encrypt', () => {
    let plaintext: string
    let expiresIn: number
    let fakeToken: string

    beforeAll(() => {
      plaintext = faker.datatype.uuid()
      expiresIn = faker.datatype.number({ min: 1, max: 86400 })
      fakeToken = faker.datatype.uuid()
      fakeJwt.sign.mockImplementation(() => fakeToken)
    })

    it('should call sign with correct values', async () => {
      await sut.encrypt({ plaintext, expiresIn })
      expect(fakeJwt.sign).toHaveBeenCalledWith({ id: plaintext }, secret, { expiresIn })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should throw if sign throws', async () => {
      jest.spyOn(fakeJwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt({ plaintext, expiresIn })
      await expect(promise).rejects.toThrow()
    })

    it('should return a token on sign success', async () => {
      const { token } = await sut.encrypt({ plaintext, expiresIn })
      expect(token).toBe(fakeToken)
    })
  })
})

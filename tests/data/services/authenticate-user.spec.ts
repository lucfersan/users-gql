import { AuthenticateUserService } from '@/data/services'
import { HashComparerSpy } from '@/tests/data/mocks/contracts/crypto'
import { throwError } from '@/tests/domain/mocks'
import { mockAuthParams } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: AuthenticateUserService
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const hashComparerSpy = new HashComparerSpy()
  const sut = new AuthenticateUserService(hashComparerSpy)
  return {
    sut,
    hashComparerSpy
  }
}

describe('AuthenticateUserService', () => {
  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut()
    const params = mockAuthParams()
    await sut.auth(params)
    expect(hashComparerSpy.params.plaintext).toBe(params.password)
    expect(hashComparerSpy.params.digest).toBe('digest')
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })
})

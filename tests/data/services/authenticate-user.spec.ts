import { AuthenticateUserService } from '@/data/services'
import { Token } from '@/domain/entities'
import { AuthenticationError } from '@/domain/entities/errors'
import { HashComparerSpy, EncrypterSpy } from '@/tests/data/mocks/contracts/crypto'
import { LoadUserByUsernameRepositorySpy } from '@/tests/data/mocks/contracts/repos'
import { throwError } from '@/tests/domain/mocks'
import { mockAuthParams } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: AuthenticateUserService
  loadUserByUsernameRepositorySpy: LoadUserByUsernameRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
  const loadUserByUsernameRepositorySpy = new LoadUserByUsernameRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new AuthenticateUserService(loadUserByUsernameRepositorySpy, hashComparerSpy, encrypterSpy)
  return {
    sut,
    loadUserByUsernameRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  }
}

describe('AuthenticateUserService', () => {
  it('should call LoadUserByUsernameRepository with correct values', async () => {
    const { sut, loadUserByUsernameRepositorySpy } = makeSut()
    const params = mockAuthParams()
    await sut.auth(params)
    expect(loadUserByUsernameRepositorySpy.params.username).toBe(params.username)
  })

  it('should throw if LoadUserByUsernameRepository throws', async () => {
    const { sut, loadUserByUsernameRepositorySpy } = makeSut()
    jest.spyOn(loadUserByUsernameRepositorySpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return an AuthenticationError if LoadUserByUsernameRepository returns undefined', async () => {
    const { sut, loadUserByUsernameRepositorySpy } = makeSut()
    loadUserByUsernameRepositorySpy.result = undefined
    const result = await sut.auth(mockAuthParams())
    expect(result).toBeInstanceOf(AuthenticationError)
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadUserByUsernameRepositorySpy } = makeSut()
    const params = mockAuthParams()
    await sut.auth(params)
    expect(hashComparerSpy.params.plaintext).toBe(params.password)
    expect(hashComparerSpy.params.digest).toBe(loadUserByUsernameRepositorySpy.result?.password)
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return an AuthenticationError if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const result = await sut.auth(mockAuthParams())
    expect(result).toBeInstanceOf(AuthenticationError)
  })

  it('should call Encrypter with correct values', async () => {
    const { sut, encrypterSpy, loadUserByUsernameRepositorySpy } = makeSut()
    const params = mockAuthParams()
    await sut.auth(params)
    expect(encrypterSpy.params.plaintext).toBe(loadUserByUsernameRepositorySpy.result?.id)
    expect(encrypterSpy.params.expiresIn).toBe(Token.expirationInSeconds)
  })
})

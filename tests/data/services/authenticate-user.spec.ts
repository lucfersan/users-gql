import { AuthenticateUserService } from '@/data/services'
import { HashComparerSpy } from '@/tests/data/mocks/contracts/crypto'
import { LoadUserByUsernameRepositorySpy } from '@/tests/data/mocks/contracts/repos'
import { throwError } from '@/tests/domain/mocks'
import { mockAuthParams } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: AuthenticateUserService
  loadUserByUsernameRepositorySpy: LoadUserByUsernameRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
  const loadUserByUsernameRepositorySpy = new LoadUserByUsernameRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new AuthenticateUserService(loadUserByUsernameRepositorySpy, hashComparerSpy)
  return {
    sut,
    loadUserByUsernameRepositorySpy,
    hashComparerSpy
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

import { AddUserService } from '@/data/services'
import { UsernameInUseError } from '@/domain/entities/errors'
import { AddUserRepositorySpy, CheckUserByUsernameRepositorySpy } from '@/tests/data/mocks/contracts/repos'
import { throwError } from '@/tests/domain/mocks'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: AddUserService
  checkUserByUsernameRepositorySpy: CheckUserByUsernameRepositorySpy
  addUserRepositorySpy: AddUserRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkUserByUsernameRepositorySpy = new CheckUserByUsernameRepositorySpy()
  checkUserByUsernameRepositorySpy.result = false
  const addUserRepositorySpy = new AddUserRepositorySpy()
  const sut = new AddUserService(checkUserByUsernameRepositorySpy, addUserRepositorySpy)
  return {
    sut,
    checkUserByUsernameRepositorySpy,
    addUserRepositorySpy
  }
}

describe('AddUserService', () => {
  it('should call CheckUserByUsernameRepository with correct value', async () => {
    const { sut, checkUserByUsernameRepositorySpy } = makeSut()
    const params = mockAddUserParams()
    await sut.add(params)
    expect(checkUserByUsernameRepositorySpy.params.username).toBe(params.username)
  })

  it('should throw if CheckUserByUsernameRepository throws', async () => {
    const { sut, checkUserByUsernameRepositorySpy } = makeSut()
    jest.spyOn(checkUserByUsernameRepositorySpy, 'check').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddUserParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return an UsernameInUseError if CheckUserByUsernameRepository returns true', async () => {
    const { sut, checkUserByUsernameRepositorySpy } = makeSut()
    checkUserByUsernameRepositorySpy.result = true
    const result = await sut.add(mockAddUserParams())
    expect(result).toBeInstanceOf(UsernameInUseError)
  })

  it('should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositorySpy } = makeSut()
    const params = mockAddUserParams()
    await sut.add(params)
    expect(addUserRepositorySpy.params).toEqual(params)
  })
})

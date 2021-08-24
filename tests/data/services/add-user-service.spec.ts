import { AddUserService } from '@/data/services'
import { CheckUserByUsernameRepositorySpy } from '@/tests/data/mocks/contracts/repos'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases/user'

type SutTypes = {
  sut: AddUserService
  checkUserByUsernameRepositorySpy: CheckUserByUsernameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkUserByUsernameRepositorySpy = new CheckUserByUsernameRepositorySpy()
  const sut = new AddUserService(checkUserByUsernameRepositorySpy)
  return {
    sut,
    checkUserByUsernameRepositorySpy
  }
}

describe('AddUserService', () => {
  it('should call CheckUserByUsernameRepository with correct value', async () => {
    const { sut, checkUserByUsernameRepositorySpy } = makeSut()
    const params = mockAddUserParams()
    await sut.add(params)
    expect(checkUserByUsernameRepositorySpy.params.username).toBe(params.username)
  })
})

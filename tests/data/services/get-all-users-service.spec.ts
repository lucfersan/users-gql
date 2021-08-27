import { GetAllUsersService } from '@/data/services'
import { GetAllUsersRepositorySpy } from '@/tests/data/mocks/contracts/repos'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: GetAllUsersService
  getAllUsersRepositorySpy: GetAllUsersRepositorySpy
}

const makeSut = (): SutTypes => {
  const getAllUsersRepositorySpy = new GetAllUsersRepositorySpy()
  const sut = new GetAllUsersService(getAllUsersRepositorySpy)
  return {
    sut,
    getAllUsersRepositorySpy
  }
}

describe('GetAllUsersService', () => {
  it('should call GetAllUsersRepository', async () => {
    const { sut, getAllUsersRepositorySpy } = makeSut()
    await sut.get()
    expect(getAllUsersRepositorySpy.callsCount).toBe(1)
  })

  it('should throw if GetAllUsersRepository throws', async () => {
    const { sut, getAllUsersRepositorySpy } = makeSut()
    jest.spyOn(getAllUsersRepositorySpy, 'getAll').mockImplementationOnce(throwError)
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })
})

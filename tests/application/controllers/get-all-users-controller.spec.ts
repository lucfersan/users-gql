import { GetAllUsersController } from '@/application/controllers'
import { GetAllUsersSpy } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: GetAllUsersController
  getAllUsersSpy: GetAllUsersSpy
}

const makeSut = (): SutTypes => {
  const getAllUsersSpy = new GetAllUsersSpy()
  const sut = new GetAllUsersController(getAllUsersSpy)
  return {
    sut,
    getAllUsersSpy
  }
}

describe('GetAllUsersController', () => {
  it('should call GetAllUsers', async () => {
    const { sut, getAllUsersSpy } = makeSut()
    await sut.handle({})
    expect(getAllUsersSpy.callsCount).toBe(1)
  })
})

import { GetAllUsersController } from '@/application/controllers'
import { serverError } from '@/application/helpers'
import { throwError } from '@/tests/domain/mocks'
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

  it('should return a serverError if GetAllUsers throws', async () => {
    const { sut, getAllUsersSpy } = makeSut()
    jest.spyOn(getAllUsersSpy, 'get').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError())
  })
})

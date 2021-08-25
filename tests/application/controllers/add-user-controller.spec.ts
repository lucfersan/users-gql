import { AddUserController } from '@/application/controllers'
import { badRequest, serverError } from '@/application/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AddUserSpy, mockAddUserParams } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: AddUserController
  addUserSpy: AddUserSpy
}

const makeSut = (): SutTypes => {
  const addUserSpy = new AddUserSpy()
  const sut = new AddUserController(addUserSpy)
  return {
    sut,
    addUserSpy
  }
}

describe('AddUserController', () => {
  it('should return a badRequest if one of the required fields is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      ...mockAddUserParams(),
      firstName: ''
    })
    expect(httpResponse).toEqual(badRequest(new Error('Required field: firstName')))
  })

  it('should return call AddUser with correct values', async () => {
    const { sut, addUserSpy } = makeSut()
    const params = mockAddUserParams()
    await sut.handle(params)
    expect(addUserSpy.params).toEqual(params)
  })

  it('should return a serverError if AddUser throws', async () => {
    const { sut, addUserSpy } = makeSut()
    jest.spyOn(addUserSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAddUserParams())
    expect(httpResponse).toEqual(serverError())
  })
})
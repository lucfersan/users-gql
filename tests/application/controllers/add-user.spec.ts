import { AddUserController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'
import { badRequest, created, serverError } from '@/application/helpers'
import { UsernameInUseError } from '@/domain/entities/errors'
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
    expect(httpResponse).toEqual(badRequest(new RequiredFieldError('firstName')))
  })

  it('should call AddUser with correct values', async () => {
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

  it('should return a badRequest with UsernameInUseError if the username already exists', async () => {
    const { sut, addUserSpy } = makeSut()
    addUserSpy.result = new UsernameInUseError()
    const httpResponse = await sut.handle(mockAddUserParams())
    expect(httpResponse).toEqual(badRequest(new UsernameInUseError()))
  })

  it('should return created on success', async () => {
    const { sut, addUserSpy } = makeSut()
    const httpResponse = await sut.handle(mockAddUserParams())
    expect(httpResponse).toEqual(created(addUserSpy.result))
  })
})

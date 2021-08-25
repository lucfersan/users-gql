import { AddUserController } from '@/application/controllers'
import { badRequest } from '@/application/helpers'
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
})

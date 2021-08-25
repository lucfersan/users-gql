import { AddUserController } from '@/application/controllers'
import { badRequest } from '@/application/helpers'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: AddUserController
}

const makeSut = (): SutTypes => {
  const sut = new AddUserController()
  return {
    sut
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
})

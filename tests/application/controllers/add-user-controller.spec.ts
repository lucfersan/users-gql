import { mockAddUserParams } from '../../domain/mocks/use-cases'

type HttpRequest = {
  firstName: string
  lastName: string
  username: string
  age: number
  password: string
}

class AddUserController {
  async handle (httpRequest: HttpRequest): Promise<any> {
    if (!httpRequest.firstName) {
      return {
        statusCode: 400,
        data: new Error('Missing param: firstName')
      }
    } else if (!httpRequest.lastName) {
      return {
        statusCode: 400,
        data: new Error('Missing param: lastName')
      }
    }
  }
}

describe('AddUserController', () => {
  it('should return a badRequest if firstName is not provided', async () => {
    const sut = new AddUserController()
    const httpResponse = await sut.handle({
      ...mockAddUserParams(),
      firstName: ''
    })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('Missing param: firstName')
    })
  })

  it('should return a badRequest if lastName is not provided', async () => {
    const sut = new AddUserController()
    const httpResponse = await sut.handle({
      ...mockAddUserParams(),
      lastName: ''
    })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('Missing param: lastName')
    })
  })
})

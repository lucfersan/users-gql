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
    const error = this.validateRequestFields(httpRequest)
    if (error) {
      return {
        statusCode: 400,
        data: error
      }
    }
  }

  private validateRequestFields (httpRequest: HttpRequest): Error | undefined {
    const requiredFields = Object.entries(httpRequest)
    for (const field of requiredFields) {
      const [key, value] = field
      if (!value) {
        return new Error(`Required field: ${key}`)
      }
    }
  }
}

describe('AddUserController', () => {
  it('should return a badRequest if one of the required fields is not provided', async () => {
    const sut = new AddUserController()
    const httpResponse = await sut.handle({
      ...mockAddUserParams(),
      firstName: ''
    })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('Required field: firstName')
    })
  })
})

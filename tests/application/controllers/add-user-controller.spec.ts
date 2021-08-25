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
    const requiredFields = Object.entries(httpRequest)
    for (const field of requiredFields) {
      const [key, value] = field
      if (!value) {
        return {
          statusCode: 400,
          data: new Error(`Required field: ${key}`)
        }
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
      data: new Error('Required field: firstName')
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
      data: new Error('Required field: lastName')
    })
  })
})

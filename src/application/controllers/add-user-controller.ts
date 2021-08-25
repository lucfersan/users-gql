type HttpRequest = {
  firstName: string
  lastName: string
  username: string
  age: number
  password: string
}

export class AddUserController {
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

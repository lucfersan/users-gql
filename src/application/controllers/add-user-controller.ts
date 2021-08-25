import { badRequest } from '@/application/helpers'
import { AddUser } from '@/domain/use-cases'

type HttpRequest = {
  firstName: string
  lastName: string
  username: string
  age: number
  password: string
}

export class AddUserController {
  constructor (private readonly addUser: AddUser) {}

  async handle (httpRequest: HttpRequest): Promise<any> {
    const error = this.validateRequestFields(httpRequest)
    if (error) {
      return badRequest(error)
    }
    await this.addUser.add(httpRequest)
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

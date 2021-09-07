import { RequiredFieldError } from '@/application/errors'
import { badRequest, created, HttpResponse, serverError, Controller } from '@/application/helpers'
import { UsernameInUseError } from '@/domain/entities/errors'
import { AddUser } from '@/domain/use-cases'

type HttpRequest = {
  firstName: string
  lastName: string
  username: string
  age: number
  password: string
}

export class AddUserController implements Controller {
  constructor (private readonly addUser: AddUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validateRequestFields(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const result = await this.addUser.add(httpRequest)
      if (result instanceof UsernameInUseError) {
        return badRequest(new UsernameInUseError())
      }
      return created(result)
    } catch {
      return serverError()
    }
  }

  private validateRequestFields (request: any): Error | undefined {
    const requiredFields = ['firstName', 'lastName', 'age', 'username', 'password']
    for (const field of requiredFields) {
      if (!request[field]) {
        return new RequiredFieldError(field)
      }
    }
  }
}

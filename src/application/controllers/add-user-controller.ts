import { RequiredFieldError } from '@/application/errors'
import { badRequest, created, HttpResponse, serverError } from '@/application/helpers'
import { UsernameInUseError } from '@/domain/entities/errors'
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

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validateRequestFields(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const result = await this.addUser.add(httpRequest)
      console.log(result)
      if (result instanceof UsernameInUseError) {
        return badRequest(new UsernameInUseError())
      }
      return created(result)
    } catch {
      return serverError()
    }
  }

  private validateRequestFields (httpRequest: HttpRequest): Error | undefined {
    const requiredFields = Object.entries(httpRequest)
    for (const field of requiredFields) {
      const [key, value] = field
      if (!value) {
        return new RequiredFieldError(key)
      }
    }
  }
}

import { RequiredFieldError } from '@/application/errors'
import { badRequest, ok, HttpResponse, serverError, unauthorized, Controller } from '@/application/helpers'
import { AuthenticationError } from '@/domain/entities/errors'
import { AuthenticateUser } from '@/domain/use-cases'

type HttpRequest = {
  username: string
  password: string
}

export class AuthenticateUserController implements Controller {
  constructor (private readonly authenticateUser: AuthenticateUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validateRequestFields(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const result = await this.authenticateUser.auth(httpRequest)
      if (result instanceof AuthenticationError) {
        return unauthorized(result)
      }
      return ok(result)
    } catch {
      return serverError()
    }
  }

  private validateRequestFields (request: any): Error | undefined {
    const requiredFields = ['username', 'password']
    for (const field of requiredFields) {
      if (!request[field]) {
        return new RequiredFieldError(field)
      }
    }
  }
}

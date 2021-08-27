import { HttpResponse, Controller, serverError, ok } from '@/application/helpers'
import { GetAllUsers } from '@/domain/use-cases'

type HttpRequest = {}

export class GetAllUsersController implements Controller {
  constructor (private readonly getAllUsers: GetAllUsers) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const users = await this.getAllUsers.get()
      return ok(users)
    } catch {
      return serverError()
    }
  }
}

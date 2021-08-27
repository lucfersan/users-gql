import { HttpResponse, Controller, serverError } from '@/application/helpers'
import { GetAllUsers } from '@/domain/use-cases'

type HttpRequest = {}

export class GetAllUsersController implements Controller {
  constructor (private readonly getAllUsers: GetAllUsers) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.getAllUsers.get()
      return {
        statusCode: 200,
        data: {}
      }
    } catch {
      return serverError()
    }
  }
}

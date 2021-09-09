import faker from 'faker'

import { AuthenticateUser } from '@/domain/use-cases'

export const mockAuthParams = (): AuthenticateUser.Params => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
})

export class AuthenticateUserSpy implements AuthenticateUser {
  result: AuthenticateUser.Result = {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    token: faker.datatype.uuid()
  }

  params: AuthenticateUser.Params

  async auth (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    this.params = params
    return this.result
  }
}

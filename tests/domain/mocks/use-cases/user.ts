import faker from 'faker'

import { AddUser } from '@/domain/use-cases'

export const mockAddUserParams = (): AddUser.Params => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  username: faker.internet.userName(),
  age: faker.datatype.number({ min: 0, max: 130 }),
  password: faker.internet.password()
})

export class AddUserSpy implements AddUser {
  result: AddUser.Result = {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    username: faker.internet.userName()
  }

  params: AddUser.Params

  async add (params: AddUser.Params): Promise<AddUser.Result> {
    this.params = params
    return this.result
  }
}

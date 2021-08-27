import faker from 'faker'

import { GetAllUsers } from '@/domain/use-cases'

export const mockGetAllUsersResult = (): GetAllUsers.Result => [
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    age: faker.datatype.number({ min: 0, max: 130 })
  },
  {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    age: faker.datatype.number({ min: 0, max: 130 })
  }
]

export class GetAllUsersSpy implements GetAllUsers {
  result: GetAllUsers.Result = mockGetAllUsersResult()
  callsCount = 0

  async get (): Promise<GetAllUsers.Result> {
    this.callsCount++
    return this.result
  }
}

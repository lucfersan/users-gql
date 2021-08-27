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

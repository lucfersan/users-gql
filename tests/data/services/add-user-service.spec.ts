import faker from 'faker'

import { AddUserService } from '@/data/services'
import { CheckUserByUsernameRepositorySpy } from '@/tests/data/mocks/contracts/repos'

describe('AddUserService', () => {
  it('should call CheckUserByUsernameRepository with correct value', async () => {
    const checkUserByUsernameRepositorySpy = new CheckUserByUsernameRepositorySpy()
    const sut = new AddUserService(checkUserByUsernameRepositorySpy)
    const params = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      age: faker.datatype.number({ min: 0, max: 130 }),
      password: faker.internet.password()
    }
    await sut.add(params)
    expect(checkUserByUsernameRepositorySpy.params).toEqual({ username: params.username })
  })
})

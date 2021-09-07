import faker from 'faker'

import { LoadUserByUsernameRepository } from '@/data/contracts/repos'

export class LoadUserByUsernameRepositorySpy implements LoadUserByUsernameRepository {
  result: LoadUserByUsernameRepository.Result = {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    password: faker.internet.password()
  }

  params: LoadUserByUsernameRepository.Params

  async load (params: LoadUserByUsernameRepository.Params): Promise<LoadUserByUsernameRepository.Result> {
    this.params = params
    return this.result
  }
}

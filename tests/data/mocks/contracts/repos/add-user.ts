import { AddUserRepository } from '@/data/contracts/repos'

export class AddUserRepositorySpy implements AddUserRepository {
  result: AddUserRepository.Result
  params: AddUserRepository.Params

  async add (params: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    this.params = params
    return this.result
  }
}

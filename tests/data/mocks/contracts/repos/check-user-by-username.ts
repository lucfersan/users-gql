import { CheckUserByUsernameRepository } from '@/data/contracts/repos'

export class CheckUserByUsernameRepositorySpy implements CheckUserByUsernameRepository {
  result: CheckUserByUsernameRepository.Result = true
  params: CheckUserByUsernameRepository.Params

  async check (params: CheckUserByUsernameRepository.Params): Promise<CheckUserByUsernameRepository.Result> {
    this.params = params
    return this.result
  }
}

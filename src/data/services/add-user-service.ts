import { CheckUserByUsernameRepository } from '@/data/contracts/repos'
import { AddUser } from '@/domain/use-cases'

export class AddUserService implements AddUser {
  constructor (private readonly checkUserByUsernameRepository: CheckUserByUsernameRepository) {}

  async add ({ username }: AddUser.Params): Promise<AddUser.Result> {
    await this.checkUserByUsernameRepository.check({ username })
    return new Error()
  }
}

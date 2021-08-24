import { CheckUserByUsernameRepository } from '@/data/contracts/repos'
import { UsernameInUseError } from '@/domain/entities/errors'
import { AddUser } from '@/domain/use-cases'

export class AddUserService implements AddUser {
  constructor (private readonly checkUserByUsernameRepository: CheckUserByUsernameRepository) { }

  async add ({ username }: AddUser.Params): Promise<AddUser.Result> {
    const exists = await this.checkUserByUsernameRepository.check({ username })
    if (exists) {
      return new UsernameInUseError()
    }
    return new Error()
  }
}

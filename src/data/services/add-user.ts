import { Hasher } from '@/data/contracts/crypto'
import { AddUserRepository, CheckUserByUsernameRepository } from '@/data/contracts/repos'
import { UsernameInUseError } from '@/domain/entities/errors'
import { AddUser } from '@/domain/use-cases'

export class AddUserService implements AddUser {
  constructor (
    private readonly checkUserByUsernameRepository: CheckUserByUsernameRepository,
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository
  ) { }

  async add (params: AddUser.Params): Promise<AddUser.Result> {
    const exists = await this.checkUserByUsernameRepository.check({ username: params.username })
    if (exists) {
      return new UsernameInUseError()
    }
    const hash = await this.hasher.hash({ plaintext: params.password })
    const basicUser = await this.addUserRepository.add({
      ...params,
      password: hash
    })
    return basicUser
  }
}

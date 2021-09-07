import { HashComparer } from '@/data/contracts/crypto'
import { LoadUserByUsernameRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'
import { AuthenticateUser } from '@/domain/use-cases'

export class AuthenticateUserService implements AuthenticateUser {
  constructor (
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth ({ username, password }: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const user = await this.loadUserByUsernameRepository.load({ username })
    if (!user) {
      return new AuthenticationError()
    }
    await this.hashComparer.compare({ plaintext: password, digest: user.password })
    return new Error()
  }
}

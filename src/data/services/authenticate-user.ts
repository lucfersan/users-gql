import { HashComparer } from '@/data/contracts/crypto'
import { LoadUserByUsernameRepository } from '@/data/contracts/repos'
import { AuthenticateUser } from '@/domain/use-cases'

export class AuthenticateUserService implements AuthenticateUser {
  constructor (
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth ({ username, password }: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    await this.loadUserByUsernameRepository.load({ username })
    await this.hashComparer.compare({ plaintext: password, digest: 'digest' })
    return new Error()
  }
}

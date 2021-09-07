import { HashComparer } from '@/data/contracts/crypto'
import { AuthenticateUser } from '@/domain/use-cases'

export class AuthenticateUserService implements AuthenticateUser {
  constructor (
    private readonly hashComparer: HashComparer
  ) {}

  async auth ({ password }: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    await this.hashComparer.compare({ plaintext: password, digest: 'digest' })
    return new Error()
  }
}

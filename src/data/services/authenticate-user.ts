import { Encrypter, HashComparer } from '@/data/contracts/crypto'
import { LoadUserByUsernameRepository } from '@/data/contracts/repos'
import { Token } from '@/domain/entities'
import { AuthenticationError } from '@/domain/entities/errors'
import { AuthenticateUser } from '@/domain/use-cases'

export class AuthenticateUserService implements AuthenticateUser {
  constructor (
    private readonly loadUserByUsernameRepository: LoadUserByUsernameRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth ({ username, password }: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const user = await this.loadUserByUsernameRepository.load({ username })
    if (!user) {
      return new AuthenticationError()
    }
    const isValid = await this.hashComparer.compare({ plaintext: password, digest: user.password })
    if (!isValid) {
      return new AuthenticationError()
    }
    const { token } = await this.encrypter.encrypt({ plaintext: user.id, expiresIn: Token.expirationInSeconds })
    return {
      id: user.id,
      firstName: user.firstName,
      token
    }
  }
}

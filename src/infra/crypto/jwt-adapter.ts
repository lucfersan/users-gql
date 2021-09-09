import jwt from 'jsonwebtoken'

import { Encrypter } from '@/data/contracts/crypto'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt ({ plaintext, expiresIn }: Encrypter.Params): Promise<Encrypter.Result> {
    const token = jwt.sign({ id: plaintext }, this.secret, { expiresIn })
    return { token }
  }
}

import bcrypt from 'bcrypt'

import { Hasher } from '@/data/contracts/crypto'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash ({ plaintext }: Hasher.Params): Promise<Hasher.Result> {
    await bcrypt.hash(plaintext, this.salt)
    return ''
  }
}

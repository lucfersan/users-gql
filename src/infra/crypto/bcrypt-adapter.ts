import bcrypt from 'bcrypt'

import { HashComparer, Hasher } from '@/data/contracts/crypto'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash ({ plaintext }: Hasher.Params): Promise<Hasher.Result> {
    const digest = await bcrypt.hash(plaintext, this.salt)
    return digest
  }

  async compare ({ plaintext, digest }: HashComparer.Params): Promise<HashComparer.Result> {
    const isValid = await bcrypt.compare(plaintext, digest)
    return isValid
  }
}

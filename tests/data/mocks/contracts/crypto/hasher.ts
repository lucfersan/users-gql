import faker from 'faker'

import { Hasher } from '@/data/contracts/crypto'

export class HasherSpy implements Hasher {
  result: Hasher.Result = faker.datatype.uuid()
  params: Hasher.Params

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
    this.params = params
    return this.result
  }
}

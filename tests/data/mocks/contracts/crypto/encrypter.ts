import faker from 'faker'

import { Encrypter } from '@/data/contracts/crypto'

export class EncrypterSpy implements Encrypter {
  result: Encrypter.Result = {
    token: faker.datatype.uuid()
  }

  params: Encrypter.Params

  async encrypt (params: Encrypter.Params): Promise<Encrypter.Result> {
    this.params = params
    return this.result
  }
}

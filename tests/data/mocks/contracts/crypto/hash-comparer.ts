import { HashComparer } from '@/data/contracts/crypto'

export class HashComparerSpy implements HashComparer {
  result: HashComparer.Result = true
  params: HashComparer.Params

  async compare (params: HashComparer.Params): Promise<HashComparer.Result> {
    this.params = params
    return this.result
  }
}

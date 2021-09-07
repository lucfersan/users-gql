import { GetAllUsersRepository } from '@/data/contracts/repos'
import { mockGetAllUsersResult } from '@/tests/domain/mocks/use-cases'

export class GetAllUsersRepositorySpy implements GetAllUsersRepository {
  result: GetAllUsersRepository.Result = mockGetAllUsersResult()
  callsCount = 0

  async getAll (): Promise<GetAllUsersRepository.Result> {
    this.callsCount++
    return this.result
  }
}

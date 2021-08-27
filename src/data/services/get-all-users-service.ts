import { GetAllUsersRepository } from '@/data/contracts/repos'
import { GetAllUsers } from '@/domain/use-cases'

export class GetAllUsersService implements GetAllUsers {
  constructor (private readonly getAllUsersRepository: GetAllUsersRepository) {}

  async get (): Promise<GetAllUsers.Result> {
    const users = this.getAllUsersRepository.getAll()
    return users
  }
}

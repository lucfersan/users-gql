import { GetAllUsersRepository } from '@/data/contracts/repos'
import { GetAllUsers } from '@/domain/use-cases'

export class GetAllUsersService implements GetAllUsers {
  constructor (private readonly getAllUsersRepository: GetAllUsersRepository) {}

  async get (): Promise<GetAllUsers.Result> {
    await this.getAllUsersRepository.getAll()
    return [{
      id: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      username: 'username',
      age: 100
    }]
  }
}

import { GetAllUsers } from '@/domain/use-cases'

export interface GetAllUsersRepository {
  getAll: () => Promise<GetAllUsersRepository.Result>
}

export namespace GetAllUsersRepository {
  export type Result = GetAllUsers.Result
}

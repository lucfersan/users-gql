import { AddUser } from '@/domain/use-cases'

export interface AddUserRepository {
  add: (params: AddUserRepository.Params) => Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = AddUser.Params
  export type Result = {
    id: string
    username: string
    firstName: string
  }
}

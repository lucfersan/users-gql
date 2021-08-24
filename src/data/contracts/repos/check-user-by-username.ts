export interface CheckUserByUsernameRepository {
  check: (params: CheckUserByUsernameRepository.Params) => Promise<CheckUserByUsernameRepository.Result>
}

export namespace CheckUserByUsernameRepository {
  export type Params = {
    username: string
  }

  export type Result = boolean
}

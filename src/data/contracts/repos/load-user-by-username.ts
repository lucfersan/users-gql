export interface LoadUserByUsernameRepository {
  load: (params: LoadUserByUsernameRepository.Params) => Promise<LoadUserByUsernameRepository.Result>
}

export namespace LoadUserByUsernameRepository {
  export type Params = {
    username: string
  }

  export type Result = {
    id: string
    firstName: string
    password: string
  } | undefined
}

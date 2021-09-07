export interface AuthenticateUser {
  auth: (params: AuthenticateUser.Params) => Promise<AuthenticateUser.Result>
}

export namespace AuthenticateUser {
  export type Params = {
    username: string
    password: string
  }

  export type Result = {
    id: string
    firstName: string
    token: string
  } | Error
}

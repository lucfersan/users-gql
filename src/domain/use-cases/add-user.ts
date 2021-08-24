export interface AddUser {
  add: (params: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = {
    firstName: string
    lastName: string
    username: string
    age: number
    password: string
  }

  export type Result = {
    id: string
    username: string
    firstName: string
  } | Error
}

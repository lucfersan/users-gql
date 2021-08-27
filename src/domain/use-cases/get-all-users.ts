export interface GetAllUsers {
  get: () => Promise<GetAllUsers.Result>
}

export namespace GetAllUsers {
  export type Result = User[]

  type User = {
    id: string
    firstName: string
    lastName: string
    username: string
    age: number
  }
}

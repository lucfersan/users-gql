export interface Encrypter {
  encrypt: (params: Encrypter.Params) => Promise<Encrypter.Result>
}

export namespace Encrypter {
  export type Params = {
    plaintext: string
    expiresIn: number
  }

  export type Result = {
    token: string
  }
}

export class AuthenticationError extends Error {
  constructor () {
    super('The username or password provided is incorrect.')
    this.name = 'AuthenticationError'
  }
}

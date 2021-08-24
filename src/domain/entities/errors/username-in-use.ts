export class UsernameInUseError extends Error {
  constructor () {
    super('The username provided is already in use.')
    this.name = 'UsernameInUseError'
  }
}

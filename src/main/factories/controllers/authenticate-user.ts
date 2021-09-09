import { AuthenticateUserController } from '@/application/controllers'
import { makeAuthenticateUserService } from '@/main/factories/services'

export const makeAuthenticateUserController = (): AuthenticateUserController => new AuthenticateUserController(makeAuthenticateUserService())

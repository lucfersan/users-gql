import { AddUserController } from '@/application/controllers'
import { makeAddUserService } from '@/main/factories/services'

export const makeAddUserController = (): AddUserController => {
  const addUserController = new AddUserController(makeAddUserService())
  return addUserController
}

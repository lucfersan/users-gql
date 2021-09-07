import { GetAllUsersController } from '@/application/controllers'
import { makeGetAllUsersService } from '@/main/factories/services'

export const makeGetAllUsersController = (): GetAllUsersController => new GetAllUsersController(makeGetAllUsersService())

import { Router } from 'express'

import { adaptExpressRoute } from '@/main/adapters'
import { makeAddUserController, makeGetAllUsersController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/users', adaptExpressRoute(makeAddUserController()))
  router.get('/users', adaptExpressRoute(makeGetAllUsersController()))
}

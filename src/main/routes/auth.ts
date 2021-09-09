import { Router } from 'express'

import { adaptExpressRoute } from '@/main/adapters'
import { makeAuthenticateUserController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/login', adaptExpressRoute(makeAuthenticateUserController()))
}

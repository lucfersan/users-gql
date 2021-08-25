import express from 'express'

import { setupApollo } from '@/main/config/apollo-server'
import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'

const app = express()

const main = async (): Promise<void> => {
  setupMiddlewares(app)
  setupRoutes(app)
  await setupApollo(app)
}

main().catch(console.error)

export { app }

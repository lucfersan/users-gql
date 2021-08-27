import './config/module-alias'
import { config } from 'dotenv-flow'

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

config({ silent: true })

app.listen(env.port, () => {
  console.log(`Server started at port ${env.port} 🔥`)
})

import { Router } from 'express'

import { makeAddUserController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/users', async (req, res) => {
    const { statusCode, data } = await makeAddUserController().handle({ ...req.body })
    const json = statusCode >= 200 && statusCode <= 299 ? data : { error: data.message }
    return res.status(statusCode).json(json)
  })
}

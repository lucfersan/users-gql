import { RequestHandler } from 'express'

import { Controller } from '@/application/helpers'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body })
  const json = [200, 201, 204].includes(statusCode) ? data : { error: data.message }
  return res.status(statusCode).json(json)
}

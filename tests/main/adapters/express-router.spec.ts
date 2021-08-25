import { NextFunction, Request, RequestHandler, Response } from 'express'
import faker from 'faker'
import { MockProxy, mock } from 'jest-mock-extended'

import { Controller } from '@/application/helpers'
import { adaptExpressRoute } from '@/main/adapters'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('ExpressRouterAdapter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler
  let field: string

  beforeAll(() => {
    field = faker.random.word()
    req = getMockReq({ body: { field } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: {
        ok: true
      }
    })
  })

  beforeEach(() => {
    sut = adaptExpressRoute(controller)
  })

  it('should call handle with correct request', async () => {
    sut(req, res, next)
    expect(controller.handle).toHaveBeenCalledWith({ field })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()
    sut(req, res, next)
    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})

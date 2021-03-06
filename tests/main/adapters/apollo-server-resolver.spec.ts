import faker from 'faker'
import { MockProxy, mock } from 'jest-mock-extended'

import { Controller } from '@/application/helpers'
import { adaptApolloResolver } from '@/main/adapters'

describe('ApolloServerResolverAdapter', () => {
  let controller: MockProxy<Controller>
  let field: string

  beforeAll(() => {
    field = faker.random.word()
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: {
        ok: true
      }
    })
  })

  it('should call handle with correct request', async () => {
    await adaptApolloResolver(controller, { field })
    expect(controller.handle).toHaveBeenCalledWith({ field })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    await adaptApolloResolver(controller)
    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with valid data', async () => {
    const data = await adaptApolloResolver(controller)
    expect(data).toEqual({ ok: true })
  })
})

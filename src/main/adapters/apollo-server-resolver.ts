import { Controller } from '@/application/helpers'

export const adaptApolloResolver = async (controller: Controller, args?: any): Promise<any> => {
  const httpResponse = await controller.handle({ ...args })
  return httpResponse.data
}

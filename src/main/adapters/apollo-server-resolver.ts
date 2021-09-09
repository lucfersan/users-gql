import { ApolloError, UserInputError, AuthenticationError } from 'apollo-server-express'

import { Controller } from '@/application/helpers'

export const adaptApolloResolver = async (controller: Controller, args?: any): Promise<any> => {
  const { statusCode, data } = await controller.handle({ ...args })
  switch (statusCode) {
    case 200:
    case 201:
    case 204: return data
    case 400: throw new UserInputError(data.message)
    case 401: throw new AuthenticationError(data.message)
    default: throw new ApolloError(data.message)
  }
}

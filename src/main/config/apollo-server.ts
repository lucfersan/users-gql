import { GraphQLResponse } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { GraphQLError } from 'graphql'

import resolvers from '@/main/graphql/resolvers'
import typeDefs from '@/main/graphql/type-defs'

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => name === errorName)
}

const handleErrors = (response: GraphQLResponse, errors: readonly GraphQLError[] | undefined): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (response.http) {
      if (checkError(error, 'UserInputError')) {
        response.http.status = 400
      } else if (checkError(error, 'AuthenticationError')) {
        response.http.status = 401
      } else {
        response.http.status = 500
      }
    }
  })
}

export const setupApollo = async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [{
      requestDidStart: async () => ({
        willSendResponse: async ({ response, errors }) => handleErrors(response, errors)
      })
    }]
  })
  await server.start()
  server.applyMiddleware({ app })
}

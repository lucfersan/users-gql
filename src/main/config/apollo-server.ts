import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'

import resolvers from '@/main/graphql/resolvers'
import typeDefs from '@/main/graphql/type-defs'

export const setupApollo = async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  await server.start()
  server.applyMiddleware({ app })
}

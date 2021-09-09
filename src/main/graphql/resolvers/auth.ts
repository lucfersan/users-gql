import { adaptApolloResolver } from '@/main/adapters'
import { makeAuthenticateUserController } from '@/main/factories/controllers'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptApolloResolver(makeAuthenticateUserController(), args)
  }
}

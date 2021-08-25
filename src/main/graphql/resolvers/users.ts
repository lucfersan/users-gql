import { adaptApolloResolver } from '@/main/adapters'
import { makeAddUserController } from '@/main/factories/controllers'

export default {
  Mutation: {
    addUser: async (parent: any, args: any) => adaptApolloResolver(makeAddUserController(), args)
  }
}

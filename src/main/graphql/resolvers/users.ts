import { makeAddUserController } from '@/main/factories/controllers'

export default {
  Mutation: {
    addUser: async (parent: any, args: any) => {
      const addUserController = makeAddUserController()
      const httpResponse = await addUserController.handle(args)
      return httpResponse.data
    }
  }
}

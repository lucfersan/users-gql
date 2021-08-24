import { AddUserRepository, CheckUserByUsernameRepository } from '@/data/contracts/repos'
import prisma from '@/infra/prisma/client'

export class PrismaUsersRepository implements CheckUserByUsernameRepository, AddUserRepository {
  async check ({ username }: CheckUserByUsernameRepository.Params): Promise<CheckUserByUsernameRepository.Result> {
    const user = await prisma.user.findUnique({ where: { username } })
    return !!user
  }

  async add (params: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const { id, firstName, username } = await prisma.user.create({ data: params })
    return {
      id,
      firstName,
      username
    }
  }
}

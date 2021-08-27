import { AddUserRepository, CheckUserByUsernameRepository, GetAllUsersRepository } from '@/data/contracts/repos'
import prisma from '@/infra/prisma/client'

export class PrismaUsersRepository implements CheckUserByUsernameRepository, AddUserRepository, GetAllUsersRepository {
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

  async getAll (): Promise<GetAllUsersRepository.Result> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        age: true,
        username: true
      }
    })
    return users
  }
}

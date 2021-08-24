import { CheckUserByUsernameRepository } from '@/data/contracts/repos'
import prisma from '@/infra/prisma/client'

export class PrismaUsersRepository implements CheckUserByUsernameRepository {
  async check ({ username }: CheckUserByUsernameRepository.Params): Promise<CheckUserByUsernameRepository.Result> {
    const user = await prisma.user.findUnique({ where: { username } })
    return !!user
  }
}

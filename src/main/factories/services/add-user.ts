import { AddUserService } from '@/data/services'
import { BcryptAdapter } from '@/infra/crypto'
import { PrismaUsersRepository } from '@/infra/prisma/repos'

export const makeAddUserService = (): AddUserService => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const prismaUsersRepository = new PrismaUsersRepository()
  return new AddUserService(prismaUsersRepository, bcryptAdapter, prismaUsersRepository)
}

import { GetAllUsersService } from '@/data/services'
import { PrismaUsersRepository } from '@/infra/prisma/repos'

export const makeGetAllUsersService = (): GetAllUsersService => {
  const prismaUsersRepository = new PrismaUsersRepository()
  return new GetAllUsersService(prismaUsersRepository)
}

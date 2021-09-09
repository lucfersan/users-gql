import { AuthenticateUserService } from '@/data/services'
import { BcryptAdapter, JwtAdapter } from '@/infra/crypto'
import { PrismaUsersRepository } from '@/infra/prisma/repos'
import { env } from '@/main/config/env'

export const makeAuthenticateUserService = (): AuthenticateUserService => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const prismaUsersRepository = new PrismaUsersRepository()
  return new AuthenticateUserService(prismaUsersRepository, bcryptAdapter, jwtAdapter)
}

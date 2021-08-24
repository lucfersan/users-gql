import { mockAddUserParams } from '@/../tests/domain/mocks/use-cases'
import prisma from '@/infra/prisma/client'
import { PrismaUsersRepository } from '@/infra/prisma/repos'

const makeSut = (): PrismaUsersRepository => new PrismaUsersRepository()

describe('PrismaUsersRepository', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should return true if a username is found', async () => {
    const sut = makeSut()
    const params = mockAddUserParams()
    await prisma.user.create({
      data: params
    })
    const result = await sut.check({ username: params.username })
    expect(result).toBe(true)
  })
})

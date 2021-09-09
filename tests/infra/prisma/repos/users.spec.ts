import faker from 'faker'

import prisma from '@/infra/prisma/client'
import { PrismaUsersRepository } from '@/infra/prisma/repos'
import { mockAddUserParams } from '@/tests/domain/mocks/use-cases'

const makeSut = (): PrismaUsersRepository => new PrismaUsersRepository()

describe('PrismaUsersRepository', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('check', () => {
    it('should return true if a username is found', async () => {
      const sut = makeSut()
      const params = mockAddUserParams()
      await prisma.user.create({
        data: params
      })
      const result = await sut.check({ username: params.username })
      expect(result).toBe(true)
    })

    it('should return false if a username is not found', async () => {
      const sut = makeSut()
      const result = await sut.check({ username: faker.internet.userName() })
      expect(result).toBe(false)
    })
  })

  describe('add', () => {
    it('should return a basic user on success', async () => {
      const sut = makeSut()
      const params = mockAddUserParams()
      const basicUser = await sut.add(params)
      expect(basicUser.id).toBeDefined()
      expect(basicUser.firstName).toBe(params.firstName)
      expect(basicUser.username).toBe(params.username)
    })
  })

  describe('getAll', () => {
    it('should return a list of users on success', async () => {
      const sut = makeSut()
      await prisma.user.createMany({
        data: [mockAddUserParams(), mockAddUserParams()]
      })
      const prismaUsers = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          username: true
        }
      })
      const users = await sut.getAll()
      expect(users).toEqual(prismaUsers)
    })
  })

  describe('load', () => {
    it('should load a user by username', async () => {
      const sut = makeSut()
      const params = mockAddUserParams()
      const { id, firstName, username, password } = await prisma.user.create({
        data: params
      })
      const user = await sut.load({ username })
      expect(user?.id).toBe(id)
      expect(user?.firstName).toBe(firstName)
      expect(user?.password).toBe(password)
    })

    it('should return undefined if a user is not found', async () => {
      const sut = makeSut()
      const user = await sut.load({ username: faker.internet.userName() })
      expect(user).toBeUndefined()
    })
  })
})

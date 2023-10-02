import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: true,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
      include: {
        roles: true,
      },
    })

    return user
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password_hash: password,
      },
    })
  }
}

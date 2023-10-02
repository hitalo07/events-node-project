import { prisma } from '@/lib/prisma'
import { Prisma, RecoveryPassword } from '@prisma/client'
import { RecoveryPasswordsRepository } from '../recovery-password.repository'

export class PrismaRecoveryPasswordsRepository
  implements RecoveryPasswordsRepository
{
  async findById(id: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = await prisma.recoveryPassword.findUnique({
      where: {
        id,
      },
    })

    return recoveryPassword
  }

  async findByUserId(userId: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = await prisma.recoveryPassword.findFirst({
      where: {
        user_id: userId,
      },
    })

    return recoveryPassword
  }

  async findByCode(code: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = await prisma.recoveryPassword.findFirst({
      where: {
        code,
      },
    })

    return recoveryPassword
  }

  async findByHash(hash: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = await prisma.recoveryPassword.findFirst({
      where: {
        hash,
      },
    })

    return recoveryPassword
  }

  async findByUserIdAndCode(
    userId: string,
    code: string,
  ): Promise<RecoveryPassword | null> {
    const recoveryPassword = await prisma.recoveryPassword.findFirst({
      where: {
        user_id: userId,
        code,
      },
    })

    return recoveryPassword
  }

  async create(
    data: Prisma.RecoveryPasswordUncheckedCreateInput,
  ): Promise<RecoveryPassword> {
    const recoveryPassword = await prisma.recoveryPassword.create({
      data,
    })

    return recoveryPassword
  }

  async updateHash(id: string, hash: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = await prisma.recoveryPassword.update({
      where: {
        id,
      },
      data: {
        hash,
      },
    })

    return recoveryPassword
  }

  async expiresByUser(userId: string): Promise<void> {
    await prisma.recoveryPassword.updateMany({
      where: {
        user_id: userId,
      },
      data: {
        expires_in: new Date(),
      },
    })
  }
}

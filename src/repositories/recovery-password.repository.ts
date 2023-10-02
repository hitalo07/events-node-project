import { Prisma, RecoveryPassword } from '@prisma/client'

export interface RecoveryPasswordsRepository {
  findById(id: string): Promise<RecoveryPassword | null>
  findByUserId(userId: string): Promise<RecoveryPassword | null>
  findByCode(code: string): Promise<RecoveryPassword | null>
  findByHash(hash: string): Promise<RecoveryPassword | null>
  findByUserIdAndCode(
    userId: string,
    code: string,
  ): Promise<RecoveryPassword | null>
  create(
    data: Prisma.RecoveryPasswordUncheckedCreateInput,
  ): Promise<RecoveryPassword>
  updateHash(id: string, hash: string): Promise<RecoveryPassword | null>
  expiresByUser(userId: string): Promise<void>
}

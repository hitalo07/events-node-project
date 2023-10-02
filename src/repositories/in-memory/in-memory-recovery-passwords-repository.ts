import { Prisma, RecoveryPassword } from '@prisma/client'
import { RecoveryPasswordsRepository } from '../recovery-password.repository'

export class InMemoryRecoveryPasswordsRepository
  implements RecoveryPasswordsRepository
{
  public items: RecoveryPassword[] = []

  async findById(id: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = this.items.find((item) => item.id === id)

    if (!recoveryPassword) {
      return null
    }

    return recoveryPassword
  }

  async findByUserId(userId: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = this.items.find((item) => item.user_id === userId)

    if (!recoveryPassword) {
      return null
    }

    return recoveryPassword
  }

  async create(data: Prisma.RecoveryPasswordUncheckedCreateInput) {
    const recoveryPassword = {
      id: 'recovery-password-1',
      code: data.code,
      expires_in: new Date(),
      user_id: data.user_id,
      hash: null,
    }

    this.items.push(recoveryPassword)

    return recoveryPassword
  }

  async findByCode(code: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = this.items.find((item) => item.code === code)

    if (!recoveryPassword) {
      return null
    }

    return recoveryPassword
  }

  async findByUserIdAndCode(
    userId: string,
    code: string,
  ): Promise<RecoveryPassword | null> {
    const recoveryPassword = this.items.find(
      (item) => item.user_id === userId && item.code === code,
    )

    if (!recoveryPassword) {
      return null
    }

    return recoveryPassword
  }

  async findByHash(hash: string): Promise<RecoveryPassword | null> {
    const recoveryPassword = this.items.find((item) => item.hash === hash)

    if (!recoveryPassword) {
      return null
    }

    return recoveryPassword
  }

  async expiresByUser(userId: string): Promise<void> {
    this.items = this.items.map((item) => {
      if (item.user_id === userId) {
        item.expires_in = new Date()
      }
      return item
    })
  }

  async updateHash(id: string, hash: string): Promise<RecoveryPassword | null> {
    this.items.map((item) => {
      if (item.id === id) {
        item.hash = hash
      }
      return item
    })

    const recoveryPassword = this.items.find((item) => item.id === id)

    if (!recoveryPassword) {
      return null
    }

    return recoveryPassword
  }
}

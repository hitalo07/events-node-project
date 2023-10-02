import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { SendPasswordRecoveryCodeByEmailUseCase } from './send-recovery-password-code-by-email'
import { InMemoryRecoveryPasswordsRepository } from '@/repositories/in-memory/in-memory-recovery-passwords-repository'
import { DateFNSProvider } from '@/providers/implementations/date-fns-provider'
import { DateProvider } from '@/providers/date-provider'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let recoveryPasswordsRepository: InMemoryRecoveryPasswordsRepository
let dateProvider: DateProvider
let sut: SendPasswordRecoveryCodeByEmailUseCase

describe('Send Password Recovery Code By Email Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    recoveryPasswordsRepository = new InMemoryRecoveryPasswordsRepository()
    dateProvider = new DateFNSProvider()
    sut = new SendPasswordRecoveryCodeByEmailUseCase(
      usersRepository,
      recoveryPasswordsRepository,
      dateProvider,
    )
  })

  it('should be able to generate recovery code to user', async () => {
    await usersRepository.create({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      role: 'CUSTOMER',
      email: 'jhonydoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { recoveryCode } = await sut.execute({
      email: 'jhonydoe@example.com',
    })

    expect(recoveryCode.code).toHaveLength(6)
  })

  it('should not be possible to generate a recovery code for a user not found', async () => {
    await usersRepository.create({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      role: 'CUSTOMER',
      email: 'jhonydoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhonydoe2@example.com',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

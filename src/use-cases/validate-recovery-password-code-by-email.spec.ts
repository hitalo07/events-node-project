import { InMemoryRecoveryPasswordsRepository } from '@/repositories/in-memory/in-memory-recovery-passwords-repository'
import { RecoveryPasswordsRepository } from '@/repositories/recovery-password.repository'
import { beforeAll, describe, expect, it } from 'vitest'
import { hash as byCryptHash } from 'bcryptjs'
import { ValidatePasswordRecoveryByEmailHashUseCase } from './validate-recovery-password-hash-by-email'
import { DateProvider } from '@/providers/date-provider'
import { DateFNSProvider } from '@/providers/implementations/date-fns-provider'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CodeIsExpiredError } from './errors/code-is-expired-error'
import { UsersRepository } from '@/repositories/users.repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: UsersRepository
let recoveryCodeRepository: RecoveryPasswordsRepository
let dateProvider: DateProvider
let sut: ValidatePasswordRecoveryByEmailHashUseCase

describe('Check Password Recovery Code By Email UseCase', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    recoveryCodeRepository = new InMemoryRecoveryPasswordsRepository()
    dateProvider = new DateFNSProvider()
    sut = new ValidatePasswordRecoveryByEmailHashUseCase(
      usersRepository,
      recoveryCodeRepository,
      dateProvider,
    )
  })

  it('should be able to check recovery code is valid', async () => {
    const createdUser = await usersRepository.create({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      role: 'CUSTOMER',
      email: 'jhonydoe@example.com',
      password_hash: await byCryptHash('123456', 6),
    })

    const code = '02459'

    await recoveryCodeRepository.create({
      id: 'recovery-code-01',
      code,
      expires_in: dateProvider.addMinutes(new Date(), 5),
      user_id: createdUser.id,
      hash: null,
    })

    const { hash } = await sut.execute({
      email: 'jhonydoe@example.com',
      code,
    })

    expect(hash).toEqual(expect.any(String))
  })

  it('should not be possible to generate a recovery code for a user email not found', async () => {
    const createdUser = await usersRepository.create({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      role: 'CUSTOMER',
      email: 'jhonydoe@example.com',
      password_hash: await byCryptHash('123456', 6),
    })

    const code = '02459'

    await recoveryCodeRepository.create({
      id: 'recovery-code-01',
      code,
      expires_in: dateProvider.addMinutes(new Date(), 5),
      user_id: createdUser.id,
      hash: null,
    })

    await expect(() =>
      sut.execute({
        email: 'carlos@example.com',
        code,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be possible to return a validation code different from the registered one', async () => {
    await usersRepository.create({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      role: 'CUSTOMER',
      email: 'jhonydoe@example.com',
      password_hash: await byCryptHash('123456', 6),
    })
    const registeredCode = '02459'
    const differentCode = '02460'
    await recoveryCodeRepository.create({
      id: 'recovery-code-01',
      code: registeredCode,
      expires_in: dateProvider.addMinutes(new Date(), 5),
      user_id: 'user-01',
      hash: null,
    })

    await expect(() =>
      sut.execute({
        email: 'email',
        code: differentCode,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be possible to return a hash if the verification code is expired', async () => {
    await usersRepository.create({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      role: 'CUSTOMER',
      email: 'jhonydoe@example.com',
      password_hash: await byCryptHash('123456', 6),
    })

    const code = '02459'

    await recoveryCodeRepository.create({
      id: 'recovery-code-01',
      code,
      expires_in: dateProvider.addMinutes(new Date(), 5),
      user_id: 'user-01',
      hash: null,
    })

    await expect(() =>
      sut.execute({
        email: 'jhonydoe@example.com',
        code,
      }),
    ).rejects.toBeInstanceOf(CodeIsExpiredError)
  })
})

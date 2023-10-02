import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { RegisterUseCase } from './register'
import { PhoneAlreadyExistsError } from './errors/phone-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      email: 'jhonydoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      email: 'jhonydoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHash = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      email: 'jhonydoe@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        first_name: 'Jhon',
        last_name: 'Doe',
        birth_date: new Date(1995, 11, 17),
        phone_country: '+55',
        phone: '99981965118',
        sex: 'MALE',
        email: 'jhonydoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should not be able to register with same phone twice', async () => {
    await sut.execute({
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(1995, 11, 17),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      email: 'jhonydoe@example.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        first_name: 'Jhon',
        last_name: 'Doe',
        birth_date: new Date(1995, 11, 17),
        phone_country: '+55',
        phone: '99981965118',
        sex: 'MALE',
        email: 'jhonydoe2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(PhoneAlreadyExistsError)
  })
})

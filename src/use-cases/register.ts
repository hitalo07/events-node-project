import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { PhoneAlreadyExistsError } from './errors/phone-already-exists-error'

interface RegisterUseCaseRequest {
  first_name: string
  last_name: string
  birth_date: Date
  phone_country: string
  phone: string
  sex: 'MALE' | 'FEMALE'
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    first_name,
    last_name,
    birth_date,
    phone_country,
    phone,
    sex,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameMail = await this.usersRepository.findByEmail(email)

    if (userWithSameMail) {
      throw new EmailAlreadyExistsError()
    }

    const userWithSamePhone = await this.usersRepository.findByPhone(phone)

    if (userWithSamePhone) {
      throw new PhoneAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      birth_date,
      phone_country,
      phone,
      sex,
      email,
      password_hash,
      roles: {
        connect: {
          slug: 'customer',
        },
      },
    })

    return { user }
  }
}

export { RegisterUseCase }

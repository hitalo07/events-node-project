import { DateProvider } from '@/providers/date-provider'
import { RecoveryPasswordsRepository } from '@/repositories/recovery-password.repository'
import { UsersRepository } from '@/repositories/users.repository'
import { generateRandomIntegerSixDigits } from '@/utils/generate-random-integer'
import { RecoveryPassword } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SendPasswordRecoveryCodeByEmailUseCaseRequest {
  email: string
}

interface SendPasswordRecoveryCodeByEmailUseCaseResponse {
  recoveryCode: RecoveryPassword
}

class SendPasswordRecoveryCodeByEmailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private recoveryPasswordsRepository: RecoveryPasswordsRepository,
    private dateProvider: DateProvider,
  ) {}

  async execute({
    email,
  }: SendPasswordRecoveryCodeByEmailUseCaseRequest): Promise<SendPasswordRecoveryCodeByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.recoveryPasswordsRepository.expiresByUser(user.id)

    const code = generateRandomIntegerSixDigits()

    const recoveryCode = await this.recoveryPasswordsRepository.create({
      code: code.toString(),
      expires_in: this.dateProvider.addMinutes(new Date(), 5),
      user_id: user.id,
    })

    return { recoveryCode }
  }
}

export { SendPasswordRecoveryCodeByEmailUseCase }

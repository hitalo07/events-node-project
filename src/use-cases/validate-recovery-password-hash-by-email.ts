import { RecoveryPasswordsRepository } from '@/repositories/recovery-password.repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DateProvider } from '@/providers/date-provider'
import { CodeIsExpiredError } from './errors/code-is-expired-error'
import { UsersRepository } from '@/repositories/users.repository'

interface ValidatePasswordRecoveryByEmailHashUseCaseRequest {
  email: string
  code: string
}

interface ValidatePasswordRecoveryByEmailHashUseCaseResponse {
  hash: string
}

class ValidatePasswordRecoveryByEmailHashUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private recoveryPasswordsRepository: RecoveryPasswordsRepository,
    private dateProvider: DateProvider,
  ) {}

  async execute({
    email,
    code,
  }: ValidatePasswordRecoveryByEmailHashUseCaseRequest): Promise<ValidatePasswordRecoveryByEmailHashUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const recoveryCode =
      await this.recoveryPasswordsRepository.findByUserIdAndCode(user.id, code)

    if (!recoveryCode) {
      throw new ResourceNotFoundError()
    }

    const isExpired = this.dateProvider.isPast(recoveryCode.expires_in)

    if (isExpired) {
      throw new CodeIsExpiredError()
    }

    const passwordRecoveryHash = await hash(code, 6)

    const recoveryPasswordWithHash =
      await this.recoveryPasswordsRepository.updateHash(
        recoveryCode.id,
        passwordRecoveryHash,
      )

    if (!recoveryPasswordWithHash) {
      throw new ResourceNotFoundError()
    }

    return { hash: passwordRecoveryHash }
  }
}

export { ValidatePasswordRecoveryByEmailHashUseCase }

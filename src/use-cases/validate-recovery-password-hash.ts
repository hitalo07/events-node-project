import { RecoveryPasswordsRepository } from '@/repositories/recovery-password.repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users.repository'
import { compare, hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InvalidRecoveryPasswordHash } from './errors/invalid-recovery-password-hash-error'

interface ValidatePasswordRecoveryHashUseCaseRequest {
  userId: string
  recoveryHash: string
  password: string
  newPassword: string
}

class ValidatePasswordRecoveryHashUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private recoveryPasswordsRepository: RecoveryPasswordsRepository,
  ) {}

  async execute({
    userId,
    recoveryHash,
    password,
    newPassword,
  }: ValidatePasswordRecoveryHashUseCaseRequest) {
    const recoveryCode = await this.recoveryPasswordsRepository.findByUserId(
      userId,
    )

    if (!recoveryCode) {
      throw new ResourceNotFoundError()
    }

    if (!recoveryCode.hash) {
      throw new InvalidRecoveryPasswordHash()
    }

    const doesHashMatches = await compare(recoveryHash, recoveryCode.hash)

    if (!doesHashMatches) {
      throw new InvalidRecoveryPasswordHash()
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const password_hash = await hash(newPassword, 6)

    await this.usersRepository.updatePassword(userId, password_hash)
  }
}

export { ValidatePasswordRecoveryHashUseCase }

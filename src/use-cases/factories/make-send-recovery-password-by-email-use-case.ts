import { PrismaRecoveryPasswordsRepository } from '@/repositories/prisma/prisma-recovery-passwords-repository'
import { SendPasswordRecoveryCodeByEmailUseCase } from '../send-recovery-password-code-by-email'
import { DateFNSProvider } from '@/providers/implementations/date-fns-provider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeSendRecoveryPasswordByEmailUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaRecoveryPasswordsRepository =
    new PrismaRecoveryPasswordsRepository()
  const dateFNSProvider = new DateFNSProvider()
  const useCase = new SendPasswordRecoveryCodeByEmailUseCase(
    prismaUsersRepository,
    prismaRecoveryPasswordsRepository,
    dateFNSProvider,
  )

  return useCase
}

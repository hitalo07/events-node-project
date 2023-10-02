import { makeSendRecoveryPasswordByEmailUseCase } from '@/use-cases/factories/make-send-recovery-password-by-email-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function recoveryPasswordByEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const recoveryPasswordBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = recoveryPasswordBodySchema.parse(request.body)
  const sendRecoveryCodeByEmail = makeSendRecoveryPasswordByEmailUseCase()

  await sendRecoveryCodeByEmail.execute({
    email,
  })

  return reply.status(200).send()
}

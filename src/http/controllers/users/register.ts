import { DateFNSProvider } from '@/providers/implementations/date-fns-provider'
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { PhoneAlreadyExistsError } from '@/use-cases/errors/phone-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const dateProvider = new DateFNSProvider()
  const registerBodySchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    birth_date: z.coerce.date().max(dateProvider.subYears(new Date(), 18)),
    phone_country: z.string(),
    phone: z.string(),
    sex: z.enum(['MALE', 'FEMALE']),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const {
    first_name,
    last_name,
    birth_date,
    phone_country,
    phone,
    sex,
    email,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      first_name,
      last_name,
      birth_date,
      phone_country,
      phone,
      sex,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    if (error instanceof PhoneAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}

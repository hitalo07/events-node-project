import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  roleSlug: 'administrator' | 'customer' | 'driver',
) {
  const user = await prisma.user.create({
    data: {
      first_name: 'Jhon',
      last_name: 'Doe',
      birth_date: new Date(),
      phone_country: '+55',
      phone: '99981965118',
      sex: 'MALE',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
      roles: {
        connect: {
          slug: roleSlug,
        },
      },
    },
    include: {
      roles: true,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhondoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    user,
  }
}

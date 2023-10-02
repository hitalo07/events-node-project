import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(
  roleToVerify: 'administrator' | 'manager' | 'customer' | 'driver',
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { roles } = request.user

    if (roles.includes(roleToVerify)) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}

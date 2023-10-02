import { env } from '@/env'
import { TransportOptions } from 'nodemailer'

export default {
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
} as TransportOptions

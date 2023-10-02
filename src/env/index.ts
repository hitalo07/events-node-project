import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  REDIS_HOST: z.coerce.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  MAIL_HOST: z.coerce.string().default(''),
  MAIL_PORT: z.coerce.string().default(''),
  MAIL_USER: z.coerce.string().default(''),
  MAIL_PASS: z.coerce.string().default(''),
  GOOGLE_MAPS_API_KEY: z.coerce.string().default(''),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variable', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data

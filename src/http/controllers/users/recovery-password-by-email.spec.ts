import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Recovery Password By Email (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to send recovery code by email', async () => {
    await request(app.server)
      .post('/users')
      .send({
        first_name: 'Jhon',
        last_name: 'Doe',
        birth_date: new Date(1995, 11, 17),
        phone_country: '+55',
        phone: '99981965118',
        sex: 'MALE',
        email: 'jhondoe@example.com',
        password: '123456',
      })

    const recoveryPasswordByEmail = await request(app.server)
      .post('/recovery-password/email')
      .send({
        email: 'jhondoe@example.com',
      })

    expect(recoveryPasswordByEmail.statusCode).toEqual(200)
  })
})

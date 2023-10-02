import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: 'user-1',
      first_name: data.first_name,
      last_name: data.last_name,
      birth_date: new Date(),
      phone_country: data.phone_country,
      phone: data.phone,
      sex: data.sex,
      email: data.email,
      password_hash: data.password_hash,
      profile_image: null,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async updatePassword(userId: string, password: string) {
    this.items.map((item) => {
      if (item.id === userId) {
        return {
          ...item,
          password_hash: password,
        }
      }
      return item
    })
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = this.items.find((item) => item.phone === phone)

    if (!user) {
      return null
    }

    return user
  }
}

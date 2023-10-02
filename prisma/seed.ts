import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.role.create({
    data: {
      name: 'Administrator',
      slug: 'administrator',
    },
  })
  await prisma.role.create({
    data: {
      name: 'Driver',
      slug: 'driver',
    },
  })
  await prisma.role.create({
    data: {
      name: 'Customer',
      slug: 'customer',
    },
  })

  console.log('Seed is done!')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

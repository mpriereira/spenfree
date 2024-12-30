import { PrismaClient, CategoryType } from '@prisma/client'

const prisma = new PrismaClient()

const baseCategories = [
  {
    name: 'Sports',
    type: CategoryType.EXPENSE,
    color: '#3993DD',
  },
  {
    name: 'Food',
    type: CategoryType.EXPENSE,
    color: '#6A3E37',
  },
  {
    name: 'Trips',
    type: CategoryType.EXPENSE,
    color: '#EE4266',
  },
  {
    name: 'Leisure',
    type: CategoryType.EXPENSE,
    color: '#0EAD69',
  },
  {
    name: 'Bills',
    type: CategoryType.EXPENSE,
    color: '#FFD23F',
  },
  {
    name: 'Salary',
    type: CategoryType.INCOME,
    color: '#9D79BC',
  },
  {
    name: 'Extra income',
    type: CategoryType.INCOME,
    color: '#6EFAFB',
  },
]

async function main() {
  await prisma.category.createMany({
    data: baseCategories,
  })

  await prisma.user.create({
    data: {
      email: 'mario@email.com',
      name: 'Mario',
    },
  })

  const categories = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const user = await prisma.user.findFirstOrThrow()

  await prisma.expense.createMany({
    data: [
      {
        title: 'Partido pádel',
        categoryId: categories[5].id,
        userId: user.id,
        amount: 500,
        date: new Date('2024-03-16'),
      },
      {
        title: 'Factura luz',
        categoryId: categories[0].id,
        userId: user.id,
        amount: 3000,
        date: new Date('2024-06-02'),
      },
      {
        title: 'Viajecito',
        categoryId: categories[6].id,
        userId: user.id,
        amount: 10000,
        date: new Date('2024-06-15'),
      },
      {
        title: 'Plan casa Beita',
        categoryId: categories[3].id,
        userId: user.id,
        amount: 2500,
        date: new Date('2024-11-16'),
      },
      {
        title: 'Clases particulares de pádel',
        categoryId: categories[5].id,
        userId: user.id,
        amount: 13000,
        date: new Date('2024-12-11'),
      },
      {
        title: 'Factura gas',
        categoryId: categories[0].id,
        userId: user.id,
        amount: 30,
        date: new Date('2024-12-15'),
      },
    ],
  })
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

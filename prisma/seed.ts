import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: { id: 1 },
    update: { name: 'Sports' },
    create: {
      id: 1,
      name: 'Sports'
    }
  });

  await prisma.category.upsert({
    where: { id: 2 },
    update: { name: 'Food' },
    create: {
      id: 2,
      name: 'Food'
    }
  });

  await prisma.category.upsert({
    where: { id: 3 },
    update: { name: 'Trips' },
    create: {
      id: 3,
      name: 'Trips'
    }
  });

  await prisma.category.upsert({
    where: { id: 4 },
    update: { name: 'Leisure' },
    create: {
      id: 4,
      name: 'Leisure'
    }
  });

  await prisma.category.upsert({
    where: { id: 5 },
    update: { name: 'Bills' },
    create: {
      id: 5,
      name: 'Bills'
    }
  });
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

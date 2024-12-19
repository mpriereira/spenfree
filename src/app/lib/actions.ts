'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

// TODO (manage authentication)
const userEmail = 'mprietopereira@gmail.com'

export async function getCategories() {
  return prisma.category.findMany()
}

export async function getExpense(id: string) {
  return prisma.expense.findUnique({
    where: { id },
  })
}

export async function getUserExpenses() {
  return prisma.expense.findMany({
    // where: { userId: 'b043cd56-4aec-4a6e-9b49-b6e96fbae3f4' },
    orderBy: { date: 'desc' },
    include: {
      user: {
        select: { name: true },
      },
      category: {
        select: { name: true, color: true, type: true },
      },
    },
  })
}

export async function saveExpense(formData: FormData, id?: string) {
  id
    ? await editExpense(formData, id).then()
    : await createExpense(formData).then()
}

async function createExpense(formData: FormData) {
  await prisma.expense.create({
    data: {
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string).toISOString(),
      amount: Number(formData.get('amount') as string) * 100,
      category: {
        connect: {
          id: formData.get('category') as string,
        },
      },
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
  })

  revalidatePath('/expenses')
}

async function editExpense(formData: FormData, id: string) {
  await prisma.expense.update({
    where: {
      id,
    },
    data: {
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string).toISOString(),
      amount: Number(formData.get('amount') as string) * 100,
      category: {
        connect: {
          id: formData.get('category') as string,
        },
      },
    },
  })

  revalidatePath('/expenses')
}

export async function deleteExpense(id: string) {
  await prisma.expense.delete({
    where: {
      id,
    },
  })

  revalidatePath('/expenses')
}

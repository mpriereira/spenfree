'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export async function getCategories() {
  return prisma.category.findMany()
}

export async function getExpense(id: number) {
  return (
    prisma.expense.findUnique({
      where: { id },
    }) ?? undefined
  )
}

export async function getUserExpenses() {
  return prisma.expense.findMany({
    where: { userId: 1 },
    orderBy: [{ date: 'desc' }, { id: 'desc' }],
    include: {
      user: {
        select: { name: true },
      },
    },
  })
}

export async function saveExpense(formData: FormData, id?: number) {
  id
    ? await editExpense(formData, id).then(() => redirect('/expenses'))
    : await createExpense(formData).then()
}

async function createExpense(formData: FormData) {
  await prisma.expense.create({
    data: {
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string).toISOString(),
      amount: +(formData.get('amount') as string),
      category: {
        connect: {
          id: +(formData.get('category') as string),
        },
      },
      user: {
        connect: {
          id: 1, // TODO
        },
      },
    },
  })

  revalidatePath('/')
}

async function editExpense(formData: FormData, id: number) {
  await prisma.expense.update({
    where: {
      id,
    },
    data: {
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string).toISOString(),
      amount: +(formData.get('amount') as string),
      category: {
        connect: {
          id: +(formData.get('category') as string),
        },
      },
    },
  })

  revalidatePath('/')
}

export async function deleteExpense(id: number) {
  await prisma.expense.delete({
    where: {
      id,
    },
  })

  revalidatePath('/')
}

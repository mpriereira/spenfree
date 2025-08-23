'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'
import prisma from '@/lib/prisma'
import { auth } from '@/app/auth'

async function getAuthenticatedUser() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/auth/signin')
  }
  return session.user
}

export async function getCategories() {
  return prisma.category.findMany()
}

export async function getExpense(id: string) {
  return prisma.expense.findUnique({
    where: { id },
  })
}

export async function getUserExpenses(period: dayjs.Dayjs) {
  const user = await getAuthenticatedUser()

  return prisma.expense.findMany({
    where: {
      userId: user.id,
      date: {
        gte: period.startOf('month').toDate(),
        lte: period.endOf('month').toDate(),
      },
    },
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
  const user = await getAuthenticatedUser()

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
          id: user.id,
        },
      },
    },
  })

  revalidatePath('/expenses')
}

async function editExpense(formData: FormData, id: string) {
  const user = await getAuthenticatedUser()

  const expense = await prisma.expense.findUnique({
    where: { id },
    select: { userId: true },
  })

  if (!expense || expense.userId !== user.id) {
    throw new Error('Unauthorized')
  }

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
  const user = await getAuthenticatedUser()

  const expense = await prisma.expense.findUnique({
    where: { id },
    select: { userId: true },
  })

  if (!expense || expense.userId !== user.id) {
    throw new Error('Unauthorized')
  }

  await prisma.expense.delete({
    where: {
      id,
    },
  })

  revalidatePath('/expenses')
}

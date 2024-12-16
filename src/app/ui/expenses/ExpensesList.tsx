'use client'

import { ScrollArea, Table } from '@mantine/core'
import { ExtendedExpense } from '@/app/lib/definitions'
import { Button } from '@/app/ui/common/Button'
import { ExpenseItem } from '@/app/ui/expenses/ExpenseItem'
import styles from './ExpensesList.module.css'

type ExpensesListProps = {
  expenses: ExtendedExpense[]
}

export const ExpensesList = async ({ expenses }: ExpensesListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <ScrollArea h={400}>
          <Table
            striped
            highlightOnHover
            horizontalSpacing={'xl'}
            verticalSpacing={'lg'}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Category</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {expenses.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} />
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>
      <Button text="Create expense" href={'/?create=true'} />
    </div>
  )
}

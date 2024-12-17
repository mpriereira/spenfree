'use client'

import Link from 'next/link'
import { Button, ScrollArea, Table } from '@mantine/core'
import { ExtendedExpense } from '@/app/lib/definitions'
import { ExpenseItem } from '@/app/ui/expenses/ExpenseItem'
import styles from './ExpensesList.module.css'

type ExpensesListProps = {
  expenses: ExtendedExpense[]
}

export const ExpensesList = ({ expenses }: ExpensesListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <ScrollArea h={650}>
          <Table
            striped
            highlightOnHover
            stickyHeader
            withRowBorders={false}
            horizontalSpacing={'xl'}
            verticalSpacing={'lg'}
          >
            <Table.Thead className={styles.tableHeader}>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th></Table.Th>
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
      <Link href="/?create=true" passHref>
        <Button>Add expense</Button>
      </Link>
    </div>
  )
}

'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button, ScrollArea, Table, TableCaption } from '@mantine/core'
import { ExtendedExpense } from '@/app/lib/definitions'
import { ExpenseItem } from '@/app/ui/expenses/ExpenseItem'
import styles from './ExpensesList.module.css'

type ExpensesListProps = {
  expenses: ExtendedExpense[]
}

export const ExpensesList = ({ expenses }: ExpensesListProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleCreateExpense = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('create', 'true')
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <ScrollArea h={400}>
          <Table
            striped
            stickyHeader
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
            {expenses.length > 0 ? (
              <Table.Tbody>
                {expenses.map((expense) => (
                  <ExpenseItem key={expense.id} expense={expense} />
                ))}
              </Table.Tbody>
            ) : (
              <TableCaption style={{ minHeight: 200 }}>
                <span>No data available</span>
              </TableCaption>
            )}
          </Table>
        </ScrollArea>
      </div>
      <Button onClick={handleCreateExpense}>Add expense</Button>
    </div>
  )
}

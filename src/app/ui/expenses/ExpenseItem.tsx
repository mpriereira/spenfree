import Link from 'next/link'
import { Button, Table } from '@mantine/core'
import { ExtendedExpense } from '@/app/lib/definitions'
import { CategoryIndicator } from '@/app/ui/expenses/CategoryIndicator'
import { DeleteExpense } from '@/app/ui/expenses/DeleteExpense'
import { PencilIcon } from '@/app/ui/common/Icons'
import styles from './ExpenseItem.module.css'

export type ExpenseItemProps = {
  expense: ExtendedExpense
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  return (
    <Table.Tr key={expense.id}>
      <Table.Td className={styles.date}>
        {expense.date.toLocaleDateString()}
      </Table.Td>
      <Table.Td>{expense.title}</Table.Td>
      <Table.Td className={styles.amount}>-{expense.amount}€</Table.Td>
      <Table.Td>
        <CategoryIndicator
          category={{ name: expense.category.name, id: expense.categoryId }}
        />
      </Table.Td>
      <Table.Td className={styles.actions}>
        <Link href={`/expenses/${expense.id}`} passHref>
          <Button variant="light" radius="lg">
            <PencilIcon />
          </Button>
        </Link>
        <DeleteExpense expenseId={expense.id} />
      </Table.Td>
    </Table.Tr>
  )
}

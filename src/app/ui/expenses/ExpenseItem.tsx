import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()

  return (
    <Table.Tr key={expense.id}>
      <Table.Td className={styles.date}>
        {expense.date.toLocaleDateString()}
      </Table.Td>
      <Table.Td>{expense.title}</Table.Td>
      <Table.Td
        className={styles[`amount__${expense.category.type.toLowerCase()}`]}
      >
        {expense.category.type === 'EXPENSE' ? '-' : ''}
        {expense.amount / 100}€
      </Table.Td>
      <Table.Td>
        <CategoryIndicator
          categoryName={expense.category.name}
          categoryColor={expense.category.color}
        />
      </Table.Td>
      <Table.Td className={styles.actions}>
        <Link
          href={`/expenses/${expense.id}?${searchParams.toString()}`}
          passHref
        >
          <Button variant="light" radius="lg">
            <PencilIcon />
          </Button>
        </Link>
        <DeleteExpense expenseId={expense.id} />
      </Table.Td>
    </Table.Tr>
  )
}

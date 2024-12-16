import { Table } from '@mantine/core'
import { ExtendedExpense } from '@/app/lib/definitions'
import { getCategoryColor } from '@/app/lib/utils'
import { Button } from '@/app/ui/common/Button'
import { PencilIcon } from '@/app/ui/common/Icons'
import { DeleteExpense } from '@/app/ui/expenses/DeleteExpense'
import styles from './ExpenseItem.module.css'

export type ExpenseItemProps = {
  expense: ExtendedExpense
}

export const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  return (
    <Table.Tr
      key={expense.id}
      style={{
        borderLeft: `10px solid ${getCategoryColor(expense.categoryId)}`,
      }}
    >
      <Table.Td className={styles.date}>
        {expense.date.toLocaleDateString()}
      </Table.Td>
      <Table.Td>{expense.title}</Table.Td>
      <Table.Td className={styles.amount}>-{expense.amount}€</Table.Td>
      <Table.Td>{expense.category.name}</Table.Td>
      <Table.Td className={styles.actions}>
        <Button icon={<PencilIcon />} href={`/expenses/${expense.id}`} />
        <DeleteExpense expenseId={expense.id} />
      </Table.Td>
    </Table.Tr>
  )
}

import { Category } from '@/app/lib/definitions'

type ExpenseCategoriesSelectorProps = {
  categories: Category[]
  defaultValue?: string
}

export const ExpenseCategoriesSelector = ({
  categories,
  defaultValue,
}: ExpenseCategoriesSelectorProps) => {
  return (
    <select required name="category" defaultValue={defaultValue}>
      <option value="" disabled>
        Select category
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  )
}

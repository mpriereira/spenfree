import { ColorSwatch } from '@mantine/core'
import { getCategoryColor } from '@/app/lib/utils'
import styles from './CategoryIndicator.module.css'

type CategoryIndicatorProps = {
  category: {
    id: number
    name: string
  }
}

export const CategoryIndicator = ({
  category: { id: categoryId, name: categoryName },
}: CategoryIndicatorProps) => {
  return (
    <div className={styles.category}>
      <ColorSwatch size={15} color={getCategoryColor(categoryId)} />
      {categoryName}
    </div>
  )
}

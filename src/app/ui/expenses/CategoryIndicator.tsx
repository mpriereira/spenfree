import { Badge } from '@mantine/core'

type CategoryIndicatorProps = {
  categoryName?: string
  categoryColor?: string
}

export const CategoryIndicator = ({
  categoryName = '',
  categoryColor = '#ccc',
}: CategoryIndicatorProps) => {
  return (
    <Badge color={categoryColor} variant="light" size="md">
      {categoryName}
    </Badge>
  )
}

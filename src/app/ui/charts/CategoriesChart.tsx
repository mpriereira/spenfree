import { DonutChart } from '@mantine/charts'
import { CategoryChartData } from '@/app/lib/definitions'

type ChartProps = {
  data: CategoryChartData[]
}

export const CategoriesChart = ({ data }: ChartProps) => {
  return (
    <DonutChart
      withLabelsLine
      labelsType="percent"
      withLabels
      withTooltip
      data={data}
    />
  )
}

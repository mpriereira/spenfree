import { DonutChart } from '@mantine/charts'
import { CategoryChartData } from '@/app/lib/definitions'

type ChartProps = {
  data: CategoryChartData[]
}

export const CategoriesChart = ({ data }: ChartProps) => {
  if (data.length === 0) {
    return (
      <div
        style={{
          height: 280,
          width: 280,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        No data available
      </div>
    )
  }

  return (
    <DonutChart
      size={200}
      withLabelsLine
      labelsType="percent"
      withLabels
      withTooltip
      data={data}
    />
  )
}

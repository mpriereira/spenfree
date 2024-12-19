'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SegmentedControl } from '@mantine/core'
import { CategoryType } from '@prisma/client'
import { capitalize } from '@/app/lib/utils'

export const ChartTypeSelector = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultChartType = searchParams.get('chart') ?? undefined

  const chartTypes = Object.values(CategoryType)
    .slice(0, 2)
    .map((type) => ({
      value: CategoryType[type],
      label: capitalize(type),
    }))

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('chart', value.toLowerCase())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <SegmentedControl
      data={chartTypes}
      defaultValue={defaultChartType?.toUpperCase()}
      onChange={handleChange}
    />
  )
}

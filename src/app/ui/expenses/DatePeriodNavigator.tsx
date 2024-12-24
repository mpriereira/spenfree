'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DateValue, MonthPickerInput } from '@mantine/dates'
import { Button } from '@mantine/core'
import { ArrowLeftIcon, ArrowRightIcon } from '@/app/ui/common/Icons'
import { capitalize } from '@/app/lib/utils'
import styles from './DatePeriodNavigator.module.css'

dayjs.extend(customParseFormat)

export const DatePeriodNavigator = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const extractDateFromParams = () => {
    return searchParams.get('period')
      ? dayjs(capitalize(searchParams.get('period')!), 'MMM-YY')
      : dayjs()
  }

  const defaultMonth = extractDateFromParams()

  const handlePickerChange = (value: DateValue) => {
    const month = dayjs(value)
    const params = new URLSearchParams(searchParams)
    params.set('period', month.format('MMM-YY').toLowerCase())
    replace(`${pathname}?${params.toString()}`)
  }

  const goToPreviousMonth = () => {
    const month = extractDateFromParams()
    handlePickerChange(dayjs(month).subtract(1, 'month').toDate())
  }

  const goToFollowingMonth = () => {
    const month = extractDateFromParams()
    handlePickerChange(dayjs(month).add(1, 'month').toDate())
  }

  const disabledNavigation = () => {
    const month = extractDateFromParams()
    return dayjs(month).add(1, 'month').isAfter(dayjs())
  }

  return (
    <div className={styles.container}>
      <Button variant="outline" onClick={goToPreviousMonth}>
        <ArrowLeftIcon />
      </Button>
      <MonthPickerInput
        placeholder="Select month"
        valueFormat="MMMM YYYY"
        value={defaultMonth.toDate()}
        onChange={handlePickerChange}
      />
      <Button
        variant="outline"
        onClick={goToFollowingMonth}
        disabled={disabledNavigation()}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Combobox, Input, InputBase, Loader, useCombobox } from '@mantine/core'
import { getCategories } from '@/app/lib/actions'
import { Category } from '@/app/lib/definitions'
import { CategoryIndicator } from '@/app/ui/expenses/CategoryIndicator'

type CategorySelectorProps = {
  defaultCategory?: string
  onChange: (categoryId: string) => void
}

export const CategorySelector = ({
  defaultCategory,
  onChange,
}: CategorySelectorProps) => {
  const [value, setValue] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Category[]>([])

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const options = data.map((category) => (
    <Combobox.Option value={category.id.toString()} key={category.id}>
      <CategoryIndicator category={category} />
    </Combobox.Option>
  ))

  const selectedLabel = useMemo(() => {
    if (!value) return ''

    const matchingOption = data.find((item) => item.id === Number(value))
    if (!matchingOption) {
      throw new Error('Error while looking for matching option')
    }
    return matchingOption.name
  }, [value, data])

  useEffect(() => {
    if (data.length === 0 && !loading) {
      setLoading(true)
      const delayedGetCategories = () =>
        new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
          return getCategories()
        })
      // TODO: rollback this to getCategories()
      delayedGetCategories().then((response) => {
        setData(response)
        setLoading(false)
        if (defaultCategory) {
          setValue(defaultCategory)
        } else {
          combobox.resetSelectedOption()
        }
      })
    }
  }, [data, loading, combobox, defaultCategory])

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val, optionProps) => {
        setValue(val)
        onChange(val)
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value ? (
            <CategoryIndicator
              category={{ name: selectedLabel, id: Number(value) }}
            />
          ) : (
            <Input.Placeholder>Pick value</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {loading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

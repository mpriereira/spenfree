import { useEffect, useMemo, useState } from 'react'
import { Combobox, Input, InputBase, Loader, useCombobox } from '@mantine/core'
import { getCategories } from '@/app/lib/actions'
import { Category } from '@/app/lib/definitions'
import { CategoryIndicator } from '@/app/ui/expenses/CategoryIndicator'

type CategorySelectorProps = {
  defaultCategory?: string
  hasError?: boolean
  onChange: (categoryId: string) => void
}

export const CategorySelector = ({
  defaultCategory,
  hasError,
  onChange,
}: CategorySelectorProps) => {
  const [search, setSearch] = useState('')
  const [value, setValue] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Category[]>([])

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
      combobox.focusTarget()
      setSearch('')
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput()
    },
  })

  const options = data
    .filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase().trim()),
    )
    .map((category) => (
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
    if (!data.length && !loading) {
      setLoading(true)
      getCategories().then((response) => {
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
      onOptionSubmit={(val) => {
        setValue(val)
        onChange(val)
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <InputBase
          error={hasError ? 'Please select a category' : undefined}
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
            <Input.Placeholder>Category</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search"
        />
        <Combobox.Options>
          {loading ? (
            <Combobox.Empty>Loading....</Combobox.Empty>
          ) : options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>No categories found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

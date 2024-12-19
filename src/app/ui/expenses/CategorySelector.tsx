import { useEffect, useMemo, useState } from 'react'
import {
  Combobox,
  Input,
  InputBase,
  Loader,
  SegmentedControl,
  useCombobox,
} from '@mantine/core'
import { Category, CategoryType } from '@prisma/client'
import { getCategories } from '@/app/lib/actions'
import { CategoryIndicator } from '@/app/ui/expenses/CategoryIndicator'
import { capitalize } from '@/app/lib/utils'
import styles from './CategorySelector.module.css'

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
  const [selectedType, setSelectedType] = useState('EXPENSE')

  const categoryTypes = Object.values(CategoryType).map((type) => ({
    value: CategoryType[type],
    label: capitalize(type),
  }))

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

  const options = useMemo(() => {
    return data
      .filter(
        (category) =>
          category.type === selectedType &&
          category.name.toLowerCase().includes(search.toLowerCase().trim()),
      )
      .map((category) => (
        <Combobox.Option value={category.id.toString()} key={category.id}>
          <CategoryIndicator
            categoryName={category.name}
            categoryColor={category.color}
          />
        </Combobox.Option>
      ))
  }, [data, search, selectedType])

  const selectedCategory = useMemo(() => {
    if (!value) return undefined

    const matchingOption = data.find((item) => item.id === value)
    if (!matchingOption) {
      throw new Error('Error while looking for matching option')
    }

    return matchingOption
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

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    combobox.focusSearchInput()
  }

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
              categoryName={selectedCategory?.name}
              categoryColor={selectedCategory?.color}
            />
          ) : (
            <Input.Placeholder>Category</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <SegmentedControl
          fullWidth
          size={'xs'}
          data={categoryTypes}
          value={selectedType}
          onChange={handleTypeChange}
          className={styles.typeSelector}
        />
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

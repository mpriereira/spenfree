import { useEffect, useState } from 'react'
import { Category } from '@prisma/client'
import { getCategories } from '@/app/expenses/actions'

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }
    fetchCategories()
  }, [])

  return { categories }
}
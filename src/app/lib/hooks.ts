import { useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'

const useDelayedDisclosure = (onClose: () => void, delay: number = 50) => {
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    setTimeout(() => open(), delay)
  }, [delay, open])

  const handleClose = () => {
    close()
    setTimeout(() => onClose(), delay)
  }

  return [opened, { open, close: handleClose }] as const
}

export { useDelayedDisclosure }

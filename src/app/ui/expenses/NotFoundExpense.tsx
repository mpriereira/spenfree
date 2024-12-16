'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/app/ui/common/Button'
import { Modal } from '@mantine/core'
import { useDelayedDisclosure } from '@/app/lib/hooks'

export const NotFoundExpense = () => {
  const router = useRouter()
  const [opened, { close }] = useDelayedDisclosure(() =>
    router.push('/expenses'),
  )

  return (
    <Modal opened={opened} onClose={close} title="Not found">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>The requested expense does not seem to exist.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button text="Go back" onClick={close} />
        </div>
      </div>
    </Modal>
  )
}

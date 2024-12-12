import { Modal } from '@/app/ui/common/Modal'
import { Button } from '@/app/ui/common/Button'

export default function NotFound() {
  return (
    <Modal title="Not found">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>The requested expense does not seem to exist.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button text="Go back" href="/expenses" />
        </div>
      </div>
    </Modal>
  )
}

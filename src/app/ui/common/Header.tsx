import { Avatar, Button, Group } from '@mantine/core'
import { auth, signOut } from '@/app/auth'
import styles from './Header.module.css'

export const Header = async () => {
  const session = await auth()

  async function logout() {
    'use server'
    await signOut()
  }

  return (
    <header className={styles.header}>
      <Group justify="space-between" w="100%" px="md">
        <h2>Spenfree</h2>
        {session?.user && (
          <Group>
            <Group gap="xs">
              {session.user?.image && 
                <Avatar src={session.user?.image} radius="xl" size="sm" />
              }
              <span>Hello, {session.user?.name}</span>
            </Group>
            <form
              action={logout}
            >
              <Button type="submit" variant="subtle" className={styles.button}>
                Sign out
              </Button>
            </form>
          </Group>
        )}
      </Group>
    </header>
  )
}

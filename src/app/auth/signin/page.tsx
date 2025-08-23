import { Button, Container, Stack, Title } from '@mantine/core'
import { signIn } from '@/app/auth'
import styles from './signin.module.css'

export default function SignIn() {
  return (
    <main className={styles.main}>
      <Container size="xs">
        <Stack gap="lg">
          <Title order={2} ta="center">
            Sign in to Spenfree
          </Title>
          <form
            action={async () => {
              'use server'
              await signIn('google', { redirectTo: '/' })
            }}
          >
            <Button type="submit" fullWidth>
              Continue with Google
            </Button>
          </form>
        </Stack>
      </Container>
    </main>
  )
} 
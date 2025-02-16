'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Form } from '@components/ui/form'

export function LoginForm() {
  const [error, setError] = useState('')
  
  async function onSubmit(data: FormData) {
    const result = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <Form action={onSubmit}>
      <Input name="email" type="email" required />
      <Input name="password" type="password" required />
      <Button type="submit">Login</Button>
      {error && <p>{error}</p>}
    </Form>
  )
}

export default LoginForm;
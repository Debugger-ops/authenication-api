'use client'

import { useState } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Form } from '@components/ui/form'

export function RegisterForm() {
  const [error, setError] = useState('')
  
  async function onSubmit(data: FormData) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
        name: data.get('name'),
      }),
    })

    if (!res.ok) {
      setError('Registration failed')
    }
  }

  return (
    <Form action={onSubmit}>
      <Input name="name" type="text" required />
      <Input name="email" type="email" required />
      <Input name="password" type="password" required />
      <Button type="submit">Register</Button>
      {error && <p>{error}</p>}
    </Form>
  )
}
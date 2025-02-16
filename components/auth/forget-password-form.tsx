'use client'

import { useState } from 'react'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Form } from '@components/ui/form'
import { ReloadIcon } from '@radix-ui/react-icons'

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  
  async function onSubmit(data: FormData) {
    setStatus('loading')
    setError('')
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email')?.toString().toLowerCase().trim(),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to send reset email')
      }

      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send password reset email. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="space-y-4">
        <Alert variant="success">
          <AlertDescription>
            Password reset email sent! Please check your inbox (and spam folder) for instructions.
          </AlertDescription>
        </Alert>
        <Button
          onClick={() => setStatus('idle')}
          variant="outline"
          className="w-full"
        >
          Send another reset link
        </Button>
      </div>
    )
  }

  return (
    <Form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <Input 
          name="email" 
          type="email" 
          placeholder="name@example.com"
          required 
          disabled={status === 'loading'}
          className="w-full"
          aria-label="Email address"
          autoComplete="email"
        />
      </div>

      <Button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Sending link...
          </>
        ) : (
          'Send reset link'
        )}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}

export default ForgotPasswordForm;
import { NextResponse } from 'next/server'
import auth from '@lib/auth';
import { registerSchema } from '@lib/validation'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = registerSchema.parse(body)
    const user = await auth.createUser(validatedData)
    
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 200 }
    )
  }
}
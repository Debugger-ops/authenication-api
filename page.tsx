import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Our App</h1>
      {/* Correct the href paths */}
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </main>
  )
}

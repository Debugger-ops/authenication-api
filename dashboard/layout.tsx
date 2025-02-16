import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Fetch the session
    const session = await getServerSession()

    // If there's no session, redirect to the login page
    if (!session) {
      redirect('/auth/login')
    }

    // If session exists, render the dashboard layout with children
    return (
      <div>
        <nav>
          {/* Dashboard navigation */}
        </nav>
        <main>{children}</main>
      </div>
    )
  } catch (error) {
    console.error('Error fetching session:', error)
    redirect('/auth/login') // Optionally redirect on error
  }
}

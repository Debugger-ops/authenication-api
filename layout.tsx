import { Providers } from './provider'
import { Session } from 'next-auth'

interface LayoutProps {
  children: React.ReactNode;
  session: Session; // Expecting a session prop
}

export default function RootLayout({ children, session }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Add any meta tags or links for fonts, styles, etc. */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your App</title>
      </head>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}

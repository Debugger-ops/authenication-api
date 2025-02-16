'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import auth from '@/lib/auth';
import LoginForm from '@components/auth/login-form';

export default function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const session = await auth.validateCredentials({
        email: 'user@example.com',
        password: 'userpassword',
      });

      if (session) {
        setIsAuthenticated(true);
        router.push('/dashboard');
      }
    };

    checkAuthentication();
  }, [router]);

  if (isAuthenticated) {
    return null; // Optionally, you can return a loading spinner here
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow rounded-lg">
        <h2 className="text-center text-3xl font-bold">Sign in to your account</h2>
        <LoginForm />
      </div>
    </div>
  );
}

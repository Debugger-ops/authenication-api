import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      }
    });

    return NextResponse.json({ users });
  } catch (error: unknown) { // Explicitly type error as unknown
    // Type Narrowing
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to fetch users', message: error.message },
        { status: 500 }
      );
    }
    // Handle non-error cases (for example, if it's not an instance of Error)
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

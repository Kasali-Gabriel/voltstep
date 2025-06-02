import { getUserById } from '@/actions/user';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

  export async function GET() {
    try {
      const { userId } = await auth();

      if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      const user = await getUserById({ clerkUserId: userId });
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error)?.message || 'Internal server error' },
        { status: 500 },
      );
    }
  }

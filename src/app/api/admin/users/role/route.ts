import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, action, role } = await request.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const client = await clerkClient();

    if (action === 'set' && role) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { role },
      });
    } else if (action === 'remove') {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { role: null },
      });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 },
    );
  }
}

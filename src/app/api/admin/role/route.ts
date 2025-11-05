import { removeRole, setRole } from '@/actions/admin/roles';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ users: [] });
    }

    const client = await clerkClient();
    const result = await client.users.getUserList({ query });

    return NextResponse.json({ users: result.data });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing userId or action' },
        { status: 400 },
      );
    }

    const formData = new FormData();
    formData.append('id', userId);

    if (action === 'set-admin') {
      formData.append('role', 'admin');
      const result = await setRole(formData);
      return NextResponse.json({ success: true, message: result.message });
    } else if (action === 'set-moderator') {
      formData.append('role', 'moderator');
      const result = await setRole(formData);
      return NextResponse.json({ success: true, message: result.message });
    } else if (action === 'remove') {
      const result = await removeRole(formData);
      return NextResponse.json({ success: true, message: result.message });
    } else {
      return NextResponse.json(
        {
          error:
            'Invalid action. Use "set-admin", "set-moderator", or "remove"',
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 },
    );
  }
}

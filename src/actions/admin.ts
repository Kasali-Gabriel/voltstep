'use server';

import { checkRole } from '@/utils/roles';
import { clerkClient } from '@clerk/nextjs/server';

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return;
  }

  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    });
  } catch {
    // Optionally log error
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  try {
    await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: null },
    });
  } catch {
    // Optionally log error
  }
}

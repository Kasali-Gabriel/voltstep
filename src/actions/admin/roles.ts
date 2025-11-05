'use server';

import { Roles } from '@/types/globals';
import { auth, clerkClient } from '@clerk/nextjs/server';

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!(await checkRole('admin'))) {
    return { message: 'Not Authorized' };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get('id') as string,
      {
        publicMetadata: { role: formData.get('role') as string },
      },
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to remove the role is an admin
  if (!(await checkRole('admin'))) {
    return { message: 'Not Authorized' };
  }

  try {
    const res = await client.users.updateUserMetadata(
      formData.get('id') as string,
      {
        publicMetadata: { role: undefined },
      },
    );
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

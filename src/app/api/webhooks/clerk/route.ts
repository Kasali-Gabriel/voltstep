import { createUser, deleteUser, getUserById, updateUser } from '@/lib/user';
import { User } from '@/types/product';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add webhook secret from clerk dashboard to .env');
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error ocurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new Response('Error occures -- missing data', {
        status: 400,
      });
    }

    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {}),
    };

    await createUser(user as User);

    return new Response('', { status: 200 });
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    if (!id || !email_addresses) {
      return new Response('Error occures -- missing data', {
        status: 400,
      });
    }
    const userUpdate = {
      email: email_addresses[0].email_address,
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {}),
    };
    // Find user by clerkUserId
    const { user } = await getUserById({ id: '', clerkUserId: id });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }
    await updateUser(user.id, userUpdate);
    return new Response('', { status: 200 });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    if (!id) {
      return new Response('Error occures -- missing data', {
        status: 400,
      });
    }
    // Find user by clerkUserId
    const { user } = await getUserById({ id: '', clerkUserId: id });
    if (!user) {
      return new Response('User not found', { status: 404 });
    }
    await deleteUser(user.id);
    return new Response('', { status: 200 });
  }
}

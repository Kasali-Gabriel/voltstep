import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from '@/actions/user';
import { CreateUserInput } from '@/types/user';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { Webhook } from 'svix';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

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
    const {
      id,
      email_addresses,
      external_accounts,
      first_name,
      last_name,
      image_url,
    } = evt.data;

    const email =
      email_addresses?.[0]?.email_address ||
      external_accounts?.[0]?.email_address ||
      '';
    const fallbackFirstName = external_accounts?.[0]?.first_name || '';
    const fallbackLastName = external_accounts?.[0]?.last_name || '';
    const fallbackImageUrl = external_accounts?.[0]?.image_url || '';

    if (!id || !email) {
      return new Response('Missing required user data', { status: 400 });
    }

    const now = new Date();

    const customer = await stripe.customers.create({
      name:
        first_name || fallbackFirstName + ' ' + last_name || fallbackLastName,
      email: email,
    });

    const user: CreateUserInput = {
      email,
      firstName: first_name || fallbackFirstName,
      lastName: last_name || fallbackLastName,
      imageUrl: image_url || fallbackImageUrl,
      createdAt: now,
      updatedAt: now,
      clerkUserId: id,
      stripeCustomerId: customer.id,
    };

    await createUser(user);

    return new Response('', { status: 200 });
  }

  if (eventType === 'user.updated') {
    const {
      id,
      email_addresses,
      external_accounts,
      first_name,
      last_name,
      image_url,
    } = evt.data;

    if (!id) {
      return new Response('Missing user ID', { status: 400 });
    }

    const email =
      email_addresses?.[0]?.email_address ||
      external_accounts?.[0]?.email_address ||
      '';
    const fallbackFirstName = external_accounts?.[0]?.first_name || '';
    const fallbackLastName = external_accounts?.[0]?.last_name || '';
    const fallbackImageUrl = external_accounts?.[0]?.image_url || '';

    const userUpdate = {
      ...(email && { email }),
      ...(first_name || fallbackFirstName
        ? { firstName: first_name || fallbackFirstName }
        : {}),
      ...(last_name || fallbackLastName
        ? { lastName: last_name || fallbackLastName }
        : {}),
      ...(image_url || fallbackImageUrl
        ? { imageUrl: image_url || fallbackImageUrl }
        : {}),
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

  // Return a generic success for unhandled event types to avoid returning undefined
  return new Response('', { status: 200 });
}

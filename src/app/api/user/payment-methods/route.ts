import { getUserById } from '@/actions/user';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST() {
  const { userId } = await auth();
  const user = await getUserById({ clerkUserId: userId ?? undefined });

  const customerId = user.user?.stripeCustomerId;

  if (!customerId) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const customerSession = await stripe.customerSessions.create({
      customer: customerId,
      components: {
        payment_element: {
          enabled: true,
          features: {
            payment_method_redisplay: 'enabled',
            payment_method_save: 'enabled',
            payment_method_save_usage: 'on_session',
            payment_method_remove: 'enabled',
          },
        },
      },
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customer_session_client_secret: customerSession.client_secret,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

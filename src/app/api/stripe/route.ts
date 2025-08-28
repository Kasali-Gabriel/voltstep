// /app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, orderId } = await req.json();

    if (!amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    const paymentIntentData: Stripe.PaymentIntentCreateParams = {
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: String(orderId),
      },
    };

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

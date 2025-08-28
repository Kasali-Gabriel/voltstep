import { updateOrder } from '@/actions/order';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-07-30.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const buf = await req.arrayBuffer();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig || '',
      endpointSecret,
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const metadata = paymentIntent.metadata || {};
      const orderId = metadata.orderId;
      const paymentMethodId = paymentIntent.payment_method;

      let stripePaymentMethodId,
        stripePaymentMethodType,
        stripePaymentMethodDetails;

      if (paymentMethodId) {
        try {
          const pm = await stripe.paymentMethods.retrieve(
            paymentMethodId as string,
          );
          stripePaymentMethodId = pm.id;
          stripePaymentMethodType = pm.type;
          stripePaymentMethodDetails = pm
            ? JSON.parse(JSON.stringify(pm))
            : undefined;
        } catch (err) {
          console.error('Failed to fetch payment method from Stripe:', err);
        }
      }

      if (orderId) {
        try {
          // Update the order with payment details
          await updateOrder(orderId, {
            stripePaymentId: paymentIntent.id,
            stripePaymentMethodId,
            stripePaymentMethodType,
            stripePaymentMethodDetails,
            status: 'CONFIRMED',
            paymentStatus: 'SUCCEEDED',
          });
        } catch (err) {
          console.error('Failed to update order from webhook:', err);
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const metadata = paymentIntent.metadata || {};
      const orderId = metadata.orderId;
      if (orderId) {
        try {
          await updateOrder(orderId, {
            paymentStatus: 'FAILED',
            status: 'CANCELLED',
          });
        } catch (err) {
          console.error('Failed to update order for payment failure:', err);
        }
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

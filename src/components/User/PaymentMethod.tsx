'use client';

import Loader from '@/components/ui/loader';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Handle new payment method submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/account?section=payment-methods`,
      },
    });

    if (error?.message) {
      setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  // Handle redirect results (after confirmation)
  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret',
    );

    if (clientSecret) {
      stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
        switch (setupIntent?.status) {
          case 'succeeded':
            toast.success('Success! Your payment method has been saved.');
            break;
          case 'processing':
            toast(
              'Processing payment details. We’ll update you once it’s complete.',
            );
            break;
          case 'requires_payment_method':
            toast.error('Failed to save payment method. Please try again.');
            break;
        }

        // Clean URL params once processed
        window.history.replaceState({}, '', window.location.pathname);
      });
    }
  }, [stripe]);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement onChange={(e) => setIsComplete(e.complete)} />

      {errorMessage && (
        <div className="w-full px-1 pt-2 text-center text-red-500">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting || !isComplete}
        className="mt-6 flex h-10 w-full items-center justify-center rounded-3xl bg-black font-medium text-white hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader size={20} borderWidth="2px" color="white" />
        ) : (
          'Add'
        )}
      </button>
    </form>
  );
};

const PaymentMethod = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [customerSessionSecret, setCustomerSessionSecret] = useState<
    string | null
  >(null);

  useEffect(() => {
    axios
      .post('/api/user/payment-methods')
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setCustomerSessionSecret(res.data.customer_session_client_secret);
      })
      .catch(() => toast.error('Failed to initialize payment method.'));
  }, []);

  if (!clientSecret || !customerSessionSecret) {
    return (
      <div className="flex justify-center py-6">
        <Loader size={44} borderWidth="2px" color="black" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col space-y-5 sm:w-4/5 sm:pl-20 xl:w-2/3 xl:pl-36">
      <h2 className="mb-7 text-2xl sm:text-3xl">Payment Methods</h2>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          customerSessionClientSecret: customerSessionSecret,
        }}
      >
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default PaymentMethod;

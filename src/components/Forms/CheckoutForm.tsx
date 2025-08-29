import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

import { useUser } from '@clerk/nextjs';
import Loader from '../ui/loader';

const CheckoutForm = ({
  orderId,
  disabled,
  guestName,
}: {
  orderId: string;
  guestName?: string;
  disabled: boolean;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useUser();

  const email = user.user?.primaryEmailAddress?.emailAddress || '';

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${orderId}&guest-name=${guestName}`,
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message ?? null);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        options={{ defaultValues: { email: email } }}
      />

      <PaymentElement />

      {errorMessage && (
        <div className="w-full px-1 pt-2 text-center text-red-500">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || disabled}
        className="mt-6 flex h-10 w-full cursor-pointer items-center justify-center rounded-3xl bg-black font-medium text-white hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-black"
      >
        {loading ? (
          <Loader size={20} borderWidth="2px" color="white" />
        ) : (
          'PAY NOW'
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;

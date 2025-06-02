import { SignedOutProp } from '@/types/auth';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { X } from 'lucide-react';
import { DialogClose } from '../ui/dialog';

const SignedOut = ({
  title,
  description,
  isSheet,
  isDialog,
}: SignedOutProp) => {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center space-y-3 text-center md:space-y-5 ${isSheet ? 'px-10 md:px-24 lg:px-16' : ''}`}
    >
      <div className="relative flex w-full items-center justify-center pt-5 md:pt-0">
        <h1 className="mx-auto text-xl font-semibold"> {title} </h1>

        {isDialog && (
          <DialogClose className="focus:ring-ring absolute top-0 right-0 z-50 -mt-4 -mr-4 flex size-8 cursor-pointer items-center justify-center rounded-full border bg-neutral-200 text-black transition hover:bg-neutral-400 focus:outline-none md:relative md:-mt-0 md:-mr-0 md:size-10">
            <X strokeWidth={2} size={28} className="size-5 md:size-7" />
          </DialogClose>
        )}
      </div>

      <p>{description}</p>

      <div
        className={`mt-5 flex w-full flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 ${isSheet ? 'lg:flex-col lg:space-y-4 lg:space-x-0' : ''}`}
      >
        <SignUpButton>
          <button className="w-full cursor-pointer rounded-3xl bg-black py-2.5 text-center leading-tight font-medium text-white hover:bg-neutral-900">
            CREATE ACCOUNT
          </button>
        </SignUpButton>

        <SignInButton>
          <button className="w-full cursor-pointer rounded-3xl bg-gray-600 py-2.5 text-center leading-tight font-medium text-white hover:bg-gray-500">
            SIGN IN
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default SignedOut;

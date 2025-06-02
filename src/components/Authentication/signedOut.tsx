import { SignedOutProp } from '@/types';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

const SignedOut = ({ title, description, isSheet }: SignedOutProp) => {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center space-y-5 text-center ${isSheet ? 'px-10 md:px-24 lg:px-16' : ''}`}
    >
      <h1 className="text-xl font-semibold">{title}</h1>
      <p>{description}</p>

      <div
        className={`mt-5 flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 ${isSheet ? 'lg:flex-col lg:space-y-4 lg:space-x-0' : ''}`}
      >
        <SignUpButton>
          <button className="w-full cursor-pointer rounded-3xl bg-black py-2.5 text-center leading-tight font-medium text-white hover:bg-neutral-900">
            CREATE ACCOUNT
          </button>
        </SignUpButton>

        <SignInButton>
          <button className="w-full cursor-pointer rounded-3xl bg-gray-500 py-2.5 text-center leading-tight font-medium text-white hover:bg-gray-700">
            SIGN IN
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default SignedOut;

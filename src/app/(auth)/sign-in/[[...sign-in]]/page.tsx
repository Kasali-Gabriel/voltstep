'use client';

import {
  authFieldClassName,
  authInputClassName,
  authLayoutClassName,
  AuthOption,
  ContinueBtn,
  errorClassName,
  Header,
  Logo,
  OtpInput,
  PasswordInput,
  ResendOTP,
  Separator,
  Socials,
} from '@/components/authComponents';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEmailStore } from '@/lib/state';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { ChevronLeft, PenLine } from 'lucide-react';

const Page = () => {
  const { email, setEmail } = useEmailStore();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              {/* 1st sign-in step */}
              <SignIn.Step name="start" className={authLayoutClassName}>
                <Logo />

                <Header
                  title="SIGN IN TO VOLTSTEP"
                  description="Shop your styles, save top picks to your wishlist, track your orders &
        power up your training journey."
                  isSemibold
                />

                <Socials isGlobalLoading={isGlobalLoading} />

                <Separator text="or" />

                <Clerk.Field name="identifier" className={authFieldClassName}>
                  <Clerk.Label asChild>
                    <Label>Email address</Label>
                  </Clerk.Label>

                  <Clerk.Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    autoComplete="email webauthn"
                    autoFocus
                    asChild
                  >
                    <Input
                      className={authInputClassName}
                      type="email"
                      disabled={isGlobalLoading}
                    />
                  </Clerk.Input>

                  <Clerk.FieldError className={errorClassName} />
                </Clerk.Field>

                <ContinueBtn isGlobalLoading={isGlobalLoading} />

                <AuthOption
                  text="Don’t have an account? "
                  btnText="Sign Up"
                  href="/sign-up"
                />
              </SignIn.Step>
              {/* Password verification */}
              <SignIn.Step name="verifications" className={authLayoutClassName}>
                <SignIn.Strategy name="email_code">
                  <Logo />

                  <Header title="Check your email" isSemibold />

                  <div className="mb-5 flex w-full flex-col items-center justify-center gap-1 text-sm text-neutral-600">
                    <span>We sent a code to your email address</span>
                    <span className="font-semibold">
                      <SignIn.SafeIdentifier />.
                    </span>
                  </div>

                  <OtpInput isGlobalLoading={isGlobalLoading} />

                  <ResendOTP />

                  <ContinueBtn
                    isGlobalLoading={isGlobalLoading}
                    BtnText="Continue"
                  />

                  <SignIn.Action navigate="start" asChild className="mt-5 flex">
                    <div className="flex w-auto cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent px-5 py-1 font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-gray-200 hover:text-black hover:shadow">
                      <ChevronLeft />
                      <span className="mt-0.5">Back</span>
                    </div>
                  </SignIn.Action>
                </SignIn.Strategy>

                <SignIn.Strategy name="password">
                  <Logo />

                  <Header
                    title="Enter your password"
                    description="Enter the password associated with your account"
                    isSemibold={false}
                  />
                  <Clerk.Field name="password" className={authFieldClassName}>
                    <div className="-mt-3 flex w-full items-center justify-center gap-3">
                      <span className="text-sm text-neutral-500 md:text-base">
                        {email}
                      </span>

                      <SignIn.Action navigate="start">
                        <PenLine className="cursor-pointer" />
                      </SignIn.Action>
                    </div>

                    <div className="mt-5 flex w-full items-center justify-between">
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>

                      <SignIn.Action
                        navigate="forgot-password"
                        className="cursor-pointer text-sm text-neutral-700 hover:font-semibold hover:text-black hover:underline"
                      >
                        Forgot password?
                      </SignIn.Action>
                    </div>

                    <PasswordInput
                      isGlobalLoading={isGlobalLoading}
                      autoFocus={true}
                    />

                    <div className="flex w-full justify-center">
                      <Clerk.FieldError className={errorClassName} />
                    </div>
                  </Clerk.Field>

                  <ContinueBtn isGlobalLoading={isGlobalLoading} />

                  <SignIn.Action navigate="start" asChild className="mt-5 flex">
                    <div className="flex w-auto cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent px-5 py-1 font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-gray-200 hover:text-black hover:shadow">
                      <ChevronLeft />
                      <span className="mt-0.5">Back</span>
                    </div>
                  </SignIn.Action>
                </SignIn.Strategy>

                <SignIn.Strategy name="reset_password_email_code">
                  <Logo />

                  <Header title="Reset your Password" isSemibold />

                  <div className="mb-5 flex w-full flex-col items-center justify-center gap-1 text-sm text-neutral-600">
                    <span>First enter the code sent to you email address</span>
                    <span className="font-semibold">
                      <SignIn.SafeIdentifier />.
                    </span>
                  </div>

                  <OtpInput isGlobalLoading={isGlobalLoading} />

                  <ResendOTP />

                  <ContinueBtn
                    isGlobalLoading={isGlobalLoading}
                    BtnText="Continue"
                  />
                </SignIn.Strategy>
              </SignIn.Step>

              <SignIn.Step
                name="forgot-password"
                className={authLayoutClassName}
              >
                <Logo />

                <Header title="Forgot your password?" />

                <SignIn.SupportedStrategy
                  name="reset_password_email_code"
                  asChild
                >
                  <button
                    disabled={isGlobalLoading}
                    className="mt-10 mb-4 flex w-full cursor-pointer items-center justify-center rounded-xl bg-red-700 px-4 py-2 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-red-900"
                  >
                    Reset your password
                  </button>
                </SignIn.SupportedStrategy>

                <Separator text="Or, sign in with another method" bigText />

                <Socials isGlobalLoading={isGlobalLoading} />

                <SignIn.Action
                  navigate="previous"
                  asChild
                  className="mt-5 flex"
                >
                  <div className="flex w-auto cursor-pointer items-center justify-center gap-1 rounded-md border border-transparent px-5 py-1 font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-gray-200 hover:text-black hover:shadow">
                    <ChevronLeft />
                    <span className="mt-0.5">Back</span>
                  </div>
                </SignIn.Action>
              </SignIn.Step>

              <SignIn.Step
                name="reset-password"
                className={authLayoutClassName}
              >
                <Header title="Reset your password" isSemibold />

                <Clerk.Field name="password" className={authFieldClassName}>
                  <Clerk.Label asChild>
                    <Label>New Password</Label>
                  </Clerk.Label>

                  <PasswordInput
                    isGlobalLoading={isGlobalLoading}
                    autoFocus={true}
                  />

                  <Clerk.FieldError className={errorClassName} />
                </Clerk.Field>

                <Clerk.Field
                  name="confirmPassword"
                  className={authFieldClassName}
                >
                  <Clerk.Label asChild>
                    <Label>Confirm Password</Label>
                  </Clerk.Label>

                  <PasswordInput isGlobalLoading={isGlobalLoading} />

                  <Clerk.FieldError className={errorClassName} />
                </Clerk.Field>

                <ContinueBtn
                  BtnText="Reset Password"
                  isGlobalLoading={isGlobalLoading}
                />
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
};

export default Page;

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
import * as SignUp from '@clerk/elements/sign-up';
import { PenLine } from 'lucide-react';

const Page = () => {
  const { email, setEmail } = useEmailStore();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              {/* 1st sign-up step */}
              <SignUp.Step name="start" className={authLayoutClassName}>
                <div className="-mt-4">
                  <Logo />
                </div>

                <Header
                  title="Create Your Voltstep Account"
                  description="Save favorites, track orders, and start your fitness journey."
                />

                <div className="mt-3 w-full">
                  <Socials isGlobalLoading={isGlobalLoading} />
                </div>

                <Separator text="or" />

                <Clerk.Field name="emailAddress" className={authFieldClassName}>
                  <Clerk.Label asChild>
                    <Label>Email address</Label>
                  </Clerk.Label>

                  <Clerk.Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    asChild
                  >
                    <Input
                      className={authInputClassName}
                      disabled={isGlobalLoading}
                    />
                  </Clerk.Input>

                  <Clerk.FieldError className={errorClassName} />
                </Clerk.Field>

                <Clerk.Field name="password" className={authFieldClassName}>
                  <Clerk.Label asChild>
                    <Label>Password</Label>
                  </Clerk.Label>

                  <PasswordInput
                    isGlobalLoading={isGlobalLoading}
                    autoFocus={false}
                  />

                  <Clerk.FieldError className={errorClassName} />
                </Clerk.Field>

                <div
                  id="clerk-captcha"
                  data-cl-theme="dark"
                  data-cl-size="flexible"
                  className="mt-2"
                />

                <ContinueBtn
                  isSignUp
                  isGlobalLoading={isGlobalLoading}
                  BtnText="Create Account"
                />

                <AuthOption
                  text="Already have an account? "
                  btnText="Sign In"
                  href="/sign-in"
                />
              </SignUp.Step>

              {/* Names step */}
              <SignUp.Step name="continue" className={authLayoutClassName}>
                <Logo />

                <Header
                  title="Add your name"
                  description="Enter the name you'd like to use for your account. You can change this later."
                  isSemibold
                />

                <Clerk.Field name="firstName" className={authFieldClassName}>
                  <Clerk.Label asChild>
                    <Label>First name</Label>
                  </Clerk.Label>

                  <Clerk.Input type="text" required autoFocus asChild>
                    <Input
                      className={authInputClassName}
                      disabled={isGlobalLoading}
                    />
                  </Clerk.Input>

                  <Clerk.FieldError className={errorClassName} />
                </Clerk.Field>

                <Clerk.Field name="lastName" className={authFieldClassName}>
                  <Clerk.Label asChild>
                    <Label>Last name</Label>
                  </Clerk.Label>

                  <Clerk.Input type="text" required asChild>
                    <Input
                      className={authInputClassName}
                      disabled={isGlobalLoading}
                    />
                  </Clerk.Input>

                  <Clerk.FieldError className={errorClassName} />
                </Clerk.Field>

                <ContinueBtn isSignUp isGlobalLoading={isGlobalLoading} />
              </SignUp.Step>

              {/* email verification step */}
              <SignUp.Step name="verifications" className={authLayoutClassName}>
                <SignUp.Strategy name="email_code">
                  <Logo />

                  <Header
                    title="Enter Verification Code"
                    description="We’ve sent a 6-digit code to your email. Please enter it to verify your account."
                    isSemibold
                  />

                  <div className="-mt-3 mb-5 flex w-full items-center justify-center gap-3">
                    <span className="text-sm text-neutral-500 md:text-base">
                      {email}
                    </span>

                    <SignUp.Action navigate="start" disabled={isGlobalLoading}>
                      <PenLine className="cursor-pointer" />
                    </SignUp.Action>
                  </div>

                  <OtpInput isGlobalLoading={isGlobalLoading} />

                  <ResendOTP isSignUp />

                  <ContinueBtn
                    isGlobalLoading={isGlobalLoading}
                    isSignUp
                    BtnText="Verify"
                  />
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
};

export default Page;

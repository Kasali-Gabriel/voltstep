import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import * as SignUp from '@clerk/elements/sign-up';

import { cn } from '@/lib/utils';
import {
  AuthContinueBtnProps,
  AuthHeaderProps,
  AuthOptionProps,
} from '@/types';
import { CircleAlert, Eye, EyeOff, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import appleLogo from '../../../public/apple-logo.png';
import googleLogo from '../../../public/google-logo.png';
import logo from '../../../public/logoIcon.png';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <Image src={logo} alt="logo" height={100} />
    </Link>
  );
};

export const Separator = ({
  text,
  bigText,
}: {
  text: string;
  bigText?: boolean;
}) => {
  return (
    <div className="flex w-full items-center justify-center sm:mb-3">
      <div className="mr-4 h-px w-full bg-stone-300" />

      <p
        className={`my-2 text-center font-semibold text-neutral-500 ${bigText ? 'w-full text-sm' : ''}`}
      >
        {text}
      </p>

      <div className="ml-4 h-px w-full bg-stone-300" />
    </div>
  );
};

export const Socials = ({ isGlobalLoading }: { isGlobalLoading: boolean }) => {
  return (
    <div className="my-5 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      <Clerk.Connection className="w-full" name="google" asChild>
        <Button
          disabled={isGlobalLoading}
          type="button"
          className="flex w-full cursor-pointer items-center justify-center rounded-md border bg-transparent py-1 shadow hover:bg-neutral-100"
        >
          <Clerk.Loading scope="provider:google">
            {(isLoading) => (
              <div className="flex w-full items-center justify-center gap-4">
                {isLoading ? (
                  <Icons.spinner className="size-4 animate-spin text-black" />
                ) : (
                  <Image
                    src={googleLogo}
                    alt="google-logo"
                    height={20}
                    placeholder="blur"
                  />
                )}
                <span className="font-semibold text-neutral-500">Google</span>
              </div>
            )}
          </Clerk.Loading>
        </Button>
      </Clerk.Connection>

      <Clerk.Connection className="w-full" name="apple" asChild>
        <Button
          disabled={isGlobalLoading}
          type="button"
          className="flex w-full cursor-pointer items-center justify-center rounded-md border bg-transparent py-1 shadow hover:bg-neutral-100"
        >
          <Clerk.Loading scope="provider:apple">
            {(isLoading) => (
              <div className="flex w-full items-center justify-center gap-4">
                {isLoading ? (
                  <Icons.spinner className="size-4 animate-spin text-black" />
                ) : (
                  <Image
                    src={appleLogo}
                    alt="apple-logo"
                    height={25}
                    placeholder="blur"
                  />
                )}
                <span className="font-semibold text-neutral-500">Apple</span>
              </div>
            )}
          </Clerk.Loading>
        </Button>
      </Clerk.Connection>
    </div>
  );
};

export const ContinueBtn = ({
  BtnText = 'Continue',
  isSignUp = false,
  isGlobalLoading,
  type = 'submit',
}: AuthContinueBtnProps) => {
  const ActionComponent = isSignUp ? SignUp.Action : SignIn.Action;

  return (
    <div className="mt-5 mb-4 w-full">
      <ActionComponent className="h-10 w-full" submit asChild>
        <Button
          type={type}
          disabled={isGlobalLoading}
          className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-black px-4 py-2 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-stone-900"
        >
          <Clerk.Loading>
            {(isLoading) => {
              return isLoading ? (
                <Icons.spinner className="size-4 animate-spin" />
              ) : (
                <div className="flex w-full items-center justify-center gap-4">
                  {BtnText}
                  <Play className="mt-0.5 h-3 w-3 fill-neutral-300 text-neutral-300" />
                </div>
              );
            }}
          </Clerk.Loading>
        </Button>
      </ActionComponent>
    </div>
  );
};

export const Header = ({ title, description, isSemibold }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-lg font-bold sm:mt-5 md:text-2xl">
        {title}
      </h2>

      <p
        className={`text-center text-sm text-neutral-500 md:text-base ${
          isSemibold ? 'my-4 font-semibold' : 'mt-2 font-normal'
        }`}
      >
        {description}
      </p>
    </div>
  );
};

export const AuthOption = ({ text, btnText, href }: AuthOptionProps) => {
  return (
    <span className="text-center text-sm text-neutral-700">
      {text}
      <Link
        href={href}
        className="text-black hover:font-semibold hover:underline"
      >
        {btnText}
      </Link>
    </span>
  );
};

export const PasswordInput = ({
  isGlobalLoading,
  autoFocus,
}: {
  isGlobalLoading: boolean;
  autoFocus?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Clerk.Input
          type={visible ? 'text' : 'password'}
          required
          autoFocus={autoFocus}
          validatePassword
          asChild
        >
          <Input
            disabled={isGlobalLoading}
            className={authInputClassName}
            type={visible ? 'text' : 'password'}
          />
        </Clerk.Input>

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-500 hover:text-black"
        >
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
};

// FIXME fix the ui when otp is incorrect and the reset the otp input field
export const OtpInput = ({ isGlobalLoading }: { isGlobalLoading: boolean }) => {
  return (
    <Clerk.Field
      name="code"
      className="mt-2 flex w-full flex-col items-center justify-center gap-2 sm:mt-4"
    >
      <Clerk.Input
        type="otp"
        className="flex justify-center has-[:disabled]:opacity-50"
        autoSubmit
        disabled={isGlobalLoading}
        autoFocus
        render={({ value, status }) => {
          return (
            <div
              data-status={status}
              className={cn(
                'relative mx-1 flex size-10 items-center justify-center rounded-md border border-neutral-400 text-sm transition-all lg:size-12 lg:text-base',
                {
                  'ring-ring ring-offset-background z-10 ring-2':
                    status === 'cursor' || status === 'selected',
                },
              )}
            >
              {value}
              {status === 'cursor' && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
                </div>
              )}
            </div>
          );
        }}
      />

      <Clerk.FieldError className="text-destructive block w-full items-center justify-center text-sm">
        <span className="flex w-full items-center justify-center gap-2">
          <CircleAlert className="fill-destructive text-white" />
          Incorrect code
        </span>
      </Clerk.FieldError>
    </Clerk.Field>
  );
};

export const ResendOTP = ({ isSignUp = false }: { isSignUp?: boolean }) => {
  const ActionComponent = isSignUp ? SignUp.Action : SignIn.Action;

  return (
    <div className="mt-3 flex w-full items-center justify-center">
      <ActionComponent
        asChild
        resend
        fallback={({ resendableAfter }) => (
          <button className="text-sm font-medium text-neutral-500" disabled>
            Resend code in (
            <span className="tabular-nums">{resendableAfter}s</span>)
          </button>
        )}
      >
        <button className="cursor-pointer text-sm font-medium text-neutral-700 hover:text-black hover:underline">
          Didn&apos;t receive a code? Resend
        </button>
      </ActionComponent>
    </div>
  );
};

export const authLayoutClassName =
  'flex w-[80vw] flex-col items-center justify-center sm:px-7 sm:w-[400px] lg:w-[450px]';

export const authInputClassName =
  'w-full rounded-md border px-4 py-2 text-sm data-[invalid]:border-destructive data-[invalid]:ring-destructive';

export const authFieldClassName =
  'mt-2 sm:mt-4 flex w-full flex-col items-start justify-start gap-2';

export const errorClassName = 'block text-sm text-destructive w-full';

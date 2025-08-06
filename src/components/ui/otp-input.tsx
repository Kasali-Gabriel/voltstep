'use client';

import { cn } from '@/lib/utils';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './input-otp';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  maxLength?: number;
}

const OTPInput = ({
  value,
  onChange,
  hasError = false,
  maxLength = 6,
}: OTPInputProps) => {
  return (
    <InputOTP
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      className={cn(hasError && 'border-red-500')}
    >
      <InputOTPGroup className="sm:gap-2 gap-1">
        {Array.from({ length: maxLength }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className={cn(
              'relative mx-1 flex size-8 sm:size-10 items-center justify-center rounded-md border text-sm transition-all lg:size-12 lg:text-base',
              hasError
                ? 'border-red-500 ring-2 ring-red-200 focus:ring-red-300'
                : 'border-neutral-400 focus:ring-blue-200',
            )}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OTPInput;

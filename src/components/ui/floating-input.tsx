import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Control } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

interface InputFieldProps {
  form: {
    // Using any here for compatibility with different form schemas
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
  };
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  fieldType?: string;
  disabled?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldType?: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldType?: string;
}

type CombinedProps = InputProps | TextareaProps;

const FloatingInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CombinedProps & {
    type?: string;
    fieldType?: string;
    field?: Record<string, unknown>;
  }
>(
  (
    { className, fieldType = 'text', type = 'text', field, ...props },
    inputRef,
  ) => {
    const commonProps = {
      placeholder: ' ',
      className: cn('peer', className),
      ref: inputRef,
      ...field,
      ...props,
    };

    return fieldType === 'textarea' ? (
      <Textarea
        {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        className="peer h-[9.5rem]"
      />
    ) : (
      <Input
        {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        type={type}
        value={props.value ?? ''}
      />
    );
  },
);
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef<
  React.ComponentRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & { fieldType?: string }
>(({ className, fieldType, ...props }, labelRef) => (
  <Label
    className={cn(
      'peer-focus:secondary peer-focus:dark:secondary bg-background dark:bg-background absolute start-2 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text px-2 text-sm font-normal text-gray-500 duration-300 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 sm:text-lg sm:peer-focus:top-1.5 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
      fieldType === 'textarea'
        ? 'peer-placeholder-shown:top-5'
        : 'peer-placeholder-shown:top-1/2',
      className,
    )}
    ref={labelRef}
    {...props}
  />
));
FloatingLabel.displayName = 'FloatingLabel';

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps & {
    label?: string;
    type?: string;
    fieldType?: string;
    disabled?: boolean;
  }
>(
  (
    {
      id,
      label,
      type = 'text',
      fieldType = 'text',
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="relative">
        <FloatingInput
          ref={ref}
          id={inputId}
          type={type}
          fieldType={fieldType}
          disabled={disabled}
          {...props}
        />
        <FloatingLabel htmlFor={inputId} fieldType={fieldType}>
          {label}
        </FloatingLabel>
      </div>
    );
  },
);
FloatingLabelInput.displayName = 'FloatingLabelInput';

export const InputField = ({
  form,
  name,
  label,
  placeholder,
  type = 'text',
}: InputFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type === 'textarea' ? (
            <Textarea
              {...field}
              placeholder={placeholder}
              className="h-[9.5rem] resize-none"
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              className="h-10 rounded-lg text-base"
              value={field.value ?? ''}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const FloatingLabelInputField = ({
  form,
  name,
  label,
  type = 'text',
  fieldType = 'text',
  disabled = false,
}: InputFieldProps) => {
  const inputId = React.useId();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <FormControl>
              <FloatingLabelInput
                {...field}
                id={inputId}
                fieldType={fieldType}
                type={type}
                label={label}
                disabled={disabled}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


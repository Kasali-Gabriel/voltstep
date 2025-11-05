import {
  hasPostalCode,
  hasStates,
  validatePhoneNumber,
  validatePostalCode,
} from '@/data/countriesData';
import { z } from 'zod';

export const AddressFormSchema = () => {
  return z
    .object({
      email: z.string().email({
        message: 'Please enter a valid email address.',
      }),
      firstName: z.string().min(2, {
        message: 'First name is required.',
      }),
      lastName: z.string().min(2, {
        message: 'Last name is required.',
      }),
      addressLine1: z.string().min(2, {
        message: 'Street address is required.',
      }),
      addressLine2: z.string().optional(),
      city: z.string().min(2, {
        message: 'City is required.',
      }),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().min(1, {
        message: 'Country is required.',
      }),
      phone: z.string().min(1, {
        message: 'Phone number is required.',
      }),
      isDefault: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      // Validate state is required if country has states
      if (data.country && hasStates(data.country) && !data.state) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'State/Province is required for this country.',
          path: ['state'],
        });
      }

      // Validate postal code is required if country has postal system
      if (data.country && hasPostalCode(data.country) && !data.zipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'ZIP/Postal code is required for this country.',
          path: ['zipCode'],
        });
      }

      // Validate postal code format if provided
      if (
        data.country &&
        data.zipCode &&
        !validatePostalCode(data.zipCode, data.country)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid postal code format for this country.',
          path: ['zipCode'],
        });
      }

      // Validate phone number format
      if (
        data.country &&
        data.phone &&
        !validatePhoneNumber(data.phone, data.country)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid phone number format for this country.',
          path: ['phone'],
        });
      }
    });
};

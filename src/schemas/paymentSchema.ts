import {
  hasPostalCode,
  hasStates,
  validatePhoneNumber,
  validatePostalCode,
} from '@/data/countriesData';
import { z } from 'zod';

export const createPaymentFormSchema = () => {
  return z
    .object({
      cardNumber: z
        .string()
        .min(13, {
          message: 'Card number must be at least 13 digits.',
        })
        .regex(/^[\d\s]+$/, {
          message: 'Card number must contain only digits and spaces.',
        }),
      expiryDate: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
          message: 'Expiry date must be in MM/YY format.',
        })
        .refine(
          (date) => {
            const [month, year] = date.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            const expMonth = parseInt(month);
            const expYear = parseInt(year);

            if (expYear > currentYear) return true;
            if (expYear === currentYear && expMonth >= currentMonth)
              return true;
            return false;
          },
          {
            message: 'Card has expired.',
          },
        ),
      cvv: z
        .string()
        .min(3, {
          message: 'CVV must be at least 3 digits.',
        })
        .max(4, {
          message: 'CVV must be at most 4 digits.',
        })
        .regex(/^\d+$/, {
          message: 'CVV must contain only digits.',
        }),
      holderName: z.string().min(2, {
        message: 'Cardholder name must be at least 2 characters.',
      }),
      isDefault: z.boolean().optional(),
      useSameAsShipping: z.boolean().optional(),
      billingAddressId: z.string().optional(),
      // Billing address fields - conditional based on useSameAsShipping
      billingAddress: z
        .object({
          email: z.string().email().optional().or(z.literal('')),
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          addressLine1: z.string().optional(),
          addressLine2: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zipCode: z.string().optional(),
          country: z.string().optional(),
          phone: z.string().optional(),
        })
        .optional(),
    })
    .superRefine((data, ctx) => {
      // Only validate billing address if not using same as shipping
      if (!data.useSameAsShipping && data.billingAddress) {
        const billing = data.billingAddress;

        // Required field validations
        if (!billing.firstName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'First name is required.',
            path: ['billingAddress', 'firstName'],
          });
        }

        if (!billing.lastName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Last name is required.',
            path: ['billingAddress', 'lastName'],
          });
        }

        if (!billing.addressLine1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Street address is required.',
            path: ['billingAddress', 'addressLine1'],
          });
        }

        if (!billing.city) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'City is required.',
            path: ['billingAddress', 'city'],
          });
        }

        if (!billing.country) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Country is required.',
            path: ['billingAddress', 'country'],
          });
        }

        if (!billing.phone) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone number is required.',
            path: ['billingAddress', 'phone'],
          });
        }

        // Country-specific validations
        if (billing.country) {
          // State validation
          if (hasStates(billing.country) && !billing.state) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'State/Province is required for this country.',
              path: ['billingAddress', 'state'],
            });
          }

          // Postal code validation
          if (hasPostalCode(billing.country) && !billing.zipCode) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'ZIP/Postal code is required for this country.',
              path: ['billingAddress', 'zipCode'],
            });
          }

          // Validate postal code format if provided
          if (
            billing.zipCode &&
            !validatePostalCode(billing.zipCode, billing.country)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Invalid postal code format for this country.',
              path: ['billingAddress', 'zipCode'],
            });
          }

          // Validate phone number format
          if (
            billing.phone &&
            !validatePhoneNumber(billing.phone, billing.country)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Invalid phone number format for this country.',
              path: ['billingAddress', 'phone'],
            });
          }
        }
      }
    });
};

// Keep the old schema for backward compatibility
export const PaymentFormSchema = createPaymentFormSchema();

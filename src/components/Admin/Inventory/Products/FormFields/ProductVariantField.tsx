'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { colorHexCodes } from '@/data/colorData';
import { subcategorySizeMapping } from '@/data/sizeData';
import { ProductFormData } from '@/schemas/productSchemas';
import { Plus, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ColorCombobox } from './ColorCombobox';

interface ProductVariantFieldProps {
  form: UseFormReturn<ProductFormData>;
  isSubmitting: boolean;
  variantFields: {
    id: string;
    color: string;
    sizes: { size: string; quantity: number }[];
  }[];
  addVariant: () => void;
  removeVariantField: (index: number) => void;
  addSizeToVariant: (variantIndex: number) => void;
  removeSizeFromVariant: (variantIndex: number, sizeIndex: number) => void;
  subcategoryName: string;
  disabled?: boolean;
}

const ProductVariantField = ({
  form,
  isSubmitting,
  variantFields,
  addVariant,
  removeVariantField,
  addSizeToVariant,
  removeSizeFromVariant,
  subcategoryName,
  disabled,
}: ProductVariantFieldProps) => {
  const allColors = Object.keys(colorHexCodes);
  const selectedColors = form
    .watch('variants')
    .map((v) => v.color)
    .filter(Boolean);
  const availableColors = allColors.filter(
    (color) => !selectedColors.includes(color),
  );

  // Calculate available sizes for each variant
  const availableSizesPerVariant = variantFields.map((_, variantIndex) => {
    const selectedSizes = form
      .watch(`variants.${variantIndex}.sizes`)
      .map((s) => s.size)
      .filter(Boolean);
    return (subcategorySizeMapping[subcategoryName] || []).filter(
      (size) => !selectedSizes.includes(size),
    );
  });

  // Check if the last variant is complete
  const variants = form.watch('variants');
  const lastVariant = variants[variants.length - 1];
  const isLastVariantComplete =
    variants.length === 0 ||
    (lastVariant && lastVariant.color && lastVariant.sizes.some((s) => s.size));

  // Create variant elements
  const variantElements = variantFields.map((variantField, variantIndex) => {
    const availableSizes = availableSizesPerVariant[variantIndex];

    return (
      <div key={variantField.id} className="space-y-4 rounded-md border p-4">
        <div className="flex items-center justify-between">
          <Label>Variant {variantIndex + 1}</Label>

          {variantFields.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="size-8 rounded-full has-[>svg]:px-0.5"
              onClick={() => removeVariantField(variantIndex)}
              disabled={isSubmitting || disabled}
            >
              <X size={16} />
            </Button>
          )}
        </div>

        <FormField
          control={form.control}
          name={`variants.${variantIndex}.color`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <ColorCombobox
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting || disabled}
                  availableColors={availableColors}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label>Sizes</Label>

          {form
            .watch(`variants.${variantIndex}.sizes`)
            .map((size, sizeIndex) => (
              <div key={sizeIndex} className="space-y-1">
                <div className="flex items-start gap-4">
                  <FormField
                    control={form.control}
                    name={`variants.${variantIndex}.sizes.${sizeIndex}.size`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            value={field.value || ''}
                            onValueChange={(value) => field.onChange(value)}
                            disabled={isSubmitting || disabled}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select size">
                                {field.value || 'Select size'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {availableSizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${variantIndex}.sizes.${sizeIndex}.quantity`}
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            value={field.value === 0 ? '' : field.value}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ''
                                  ? 0
                                  : parseInt(e.target.value),
                              )
                            }
                            className="h-9 md:h-9"
                            placeholder="Qty"
                            disabled={isSubmitting || disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch(`variants.${variantIndex}.sizes`).length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="size-7 rounded-full has-[>svg]:px-0.5"
                      onClick={() =>
                        removeSizeFromVariant(variantIndex, sizeIndex)
                      }
                      disabled={isSubmitting || disabled}
                    >
                      <X size={14} />
                    </Button>
                  )}
                </div>
              </div>
            ))}

          <button
            className="mt-4 flex h-9 w-full cursor-pointer items-center justify-center gap-3 rounded-4xl border bg-gray-50 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
            type="button"
            onClick={() => addSizeToVariant(variantIndex)}
            disabled={isSubmitting || disabled}
          >
            <Plus size={14} />
            Add New Size
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="space-y-4">
      <Label>Variants</Label>

      {variantElements}

      <button
        className="flex h-9 w-full cursor-pointer items-center justify-center gap-3 rounded-4xl border bg-gray-50 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
        type="button"
        onClick={addVariant}
        disabled={isSubmitting || disabled || !isLastVariantComplete}
      >
        <Plus size={16} />
        Add New Variant
      </button>
    </div>
  );
};

export default ProductVariantField;

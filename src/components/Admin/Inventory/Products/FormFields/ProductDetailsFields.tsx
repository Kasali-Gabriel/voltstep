'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProductFormData } from '@/schemas/productSchemas';
import { Catalog } from '@/types/product';
import { UseFormReturn } from 'react-hook-form';

export interface ProductDetailsFieldsProps {
  form: UseFormReturn<ProductFormData>;
  isSubmitting: boolean;
  handleNameChange: (name: string) => void;
  subcategoryName: string;
  catalogData: Catalog[];
}

const ProductDetailsFields = ({
  form,
  isSubmitting,
  handleNameChange,
  subcategoryName,
  catalogData,
}: ProductDetailsFieldsProps) => {
  const watchedCatalog = form.watch('catalog');
  const watchedCategory = form.watch('category');

  const selectedCatalogObj = catalogData.find((c) => c.name === watchedCatalog);
  const selectedCategoryObj = selectedCatalogObj?.categories?.find(
    (cat) => cat.name === watchedCategory,
  );

  return (
    <div className="w-full space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter product name"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="product-slug"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter product description"
                disabled={isSubmitting}
                className="h-32"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                value={field.value ?? ''}
                type="number"
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ''
                      ? undefined
                      : parseFloat(e.target.value),
                  )
                }
                placeholder="$0.00"
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!subcategoryName && (
        <div className="w-full space-y-4">
          <div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-2 lg:flex-col lg:gap-4 xl:flex-row">
            <FormField
              control={form.control}
              name="catalog"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Catalog</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('category', '');
                      form.setValue('subcategory', '');
                    }}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select catalog" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {catalogData.map((catalog) => (
                        <SelectItem key={catalog.name} value={catalog.name}>
                          {catalog.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('subcategory', '');
                    }}
                    value={field.value}
                    disabled={isSubmitting || !watchedCatalog}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCatalogObj?.categories?.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      )) || []}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting || !watchedCategory}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCategoryObj?.subcategories?.map((sub) => (
                        <SelectItem key={sub.name} value={sub.name}>
                          {sub.name}
                        </SelectItem>
                      )) || []}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsFields;

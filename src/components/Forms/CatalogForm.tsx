'use client';

import { AddImageButton } from '@/components/Buttons/AddImageButton';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CatalogFormSchema } from '@/schemas/catalogSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import Loader from '../ui/loader';

type CatalogFormData = z.infer<typeof CatalogFormSchema>;

interface CatalogFormProps {
  onSubmit: (data: CatalogFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  initialData?: CatalogFormData;
}

export const CatalogForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
  initialData,
}: CatalogFormProps) => {
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const form = useForm<CatalogFormData>({
    resolver: zodResolver(CatalogFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      img: initialData?.img || '',
    },
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    form.setValue('name', name);
    if (!isSlugEdited) {
      const slug = generateSlug(name);
      form.setValue('slug', slug);
    }
  };

  const handleSlugChange = (slug: string) => {
    form.setValue('slug', slug);
    setIsSlugEdited(true);
  };

  const handleImageChange = (url: string | string[]) => {
    // Accept string or array (AddImageButton can return either)
    const value = Array.isArray(url) ? (url[0] ?? '') : url;
    form.setValue('img', value);
  };

  const handleImageRemove = () => {
    form.setValue('img', '');
  };

  const handleSubmit = async (data: CatalogFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catalog Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter catalog name"
                  disabled={isSubmitting}
                  onChange={(e) => handleNameChange(e.target.value)}
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
                  placeholder="catalog-slug"
                  disabled={isSubmitting}
                  onChange={(e) => handleSlugChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <AddImageButton
                  image={field.value}
                  onImageChange={handleImageChange}
                  onImageRemove={handleImageRemove}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-2xl"
          >
            Cancel
          </Button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-9 w-40 cursor-pointer items-center justify-center rounded-2xl bg-black text-white hover:bg-neutral-800 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader color="white" borderWidth="2px" size={22} />
            ) : initialData ? (
              'Update Catalog'
            ) : (
              'Create Catalog'
            )}
          </button>
        </div>
      </form>
    </Form>
  );
};

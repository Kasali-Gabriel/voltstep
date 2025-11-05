import { AddImageButton } from '@/components/Buttons/AddImageButton';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { ProductFormData } from '@/schemas/productSchemas';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface ProductImageFieldProps {
  form: UseFormReturn<ProductFormData>;
  isSubmitting: boolean;
  showSidebar: boolean;
}

const ProductImageField = ({
  form,
  isSubmitting,
  showSidebar,
}: ProductImageFieldProps) => {
  const watchedImages = form.watch('images');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLgScreen, setIsLgScreen] = useState(false);

  const handleImageChange = (index: number, url: string | string[]) => {
    const currentImages = form.getValues('images');
    const newImages = [...currentImages];

    if (Array.isArray(url)) {
      // Handle multiple images: fill empty slots starting from the clicked index
      let currentIndex = index;
      url.forEach((imageUrl) => {
        while (currentIndex < 8 && newImages[currentIndex]) {
          currentIndex++;
        }
        if (currentIndex < 8) {
          newImages[currentIndex] = imageUrl;
          currentIndex++;
        }
      });
    } else {
      // Handle single image
      newImages[index] = url;
    }

    form.setValue('images', newImages);
    if (selectedImageIndex >= newImages.length) {
      setSelectedImageIndex(Math.max(0, newImages.length - 1));
    }
  };

  const handleImageRemove = (index: number) => {
    const currentImages = form.getValues('images');
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue('images', newImages);
    if (selectedImageIndex >= newImages.length) {
      setSelectedImageIndex(Math.max(0, newImages.length - 1));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLgScreen(width >= 1024 && width < 1280);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <FormField
      control={form.control}
      name="images"
      render={() => (
        <FormItem>
          <FormControl>
            <div className="w-full space-y-7 lg:mt-5">
              <div
                className={`aspect-square w-full rounded-md border-2 border-dashed transition-colors ${
                  watchedImages.length > 0
                    ? 'border-transparent'
                    : 'border-gray-300'
                }`}
              >
                {watchedImages.length === 0 ? (
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-dashed text-gray-400">
                    <Plus size={52} />
                    <span className="mt-2 text-xl">Add Image</span>
                  </div>
                ) : (
                  <Image
                    src={watchedImages[selectedImageIndex] || watchedImages[0]}
                    alt="Selected product image"
                    width={500}
                    height={500}
                    className="h-auto w-full rounded-md object-cover"
                  />
                )}
              </div>

              <div className="grid grid-cols-4 grid-rows-2 gap-4">
                {[...Array(8)].map((_, index) => (
                  <AddImageButton
                    key={index}
                    size={
                      (showSidebar && isLgScreen) || isMobile
                        ? 'size-[4.5rem]'
                        : 'size-24'
                    }
                    image={watchedImages[index] ?? ''}
                    onImageChange={(url) => handleImageChange(index, url)}
                    onImageRemove={() => handleImageRemove(index)}
                    onClick={() => setSelectedImageIndex(index)}
                    disabled={isSubmitting}
                    multiple={true}
                  />
                ))}
              </div>

              <FormMessage />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default ProductImageField;

'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const openDialog = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setZoom(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openDialog(index)}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border shadow"
          >
            <Image
              src={image}
              alt={`${productName} ${index + 1}`}
              fill
              className="rounded-2xl object-cover transition-transform group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>

        <DialogContent
          showCloseButton={false}
          className="flex w-full max-w-5xl flex-col items-center bg-black/95 p-0 text-white"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={closeDialog}
            className="absolute top-3 right-3 text-white hover:bg-white/10"
          >
            <X size={22} />
          </Button>

          <div className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-black">
            <Image
              src={images[currentIndex]}
              alt={`${productName} ${currentIndex + 1}`}
              fill
              className={`rounded-2xl object-contain transition-transform ${
                zoom ? 'scale-150 cursor-move' : 'scale-100'
              }`}
            />
          </div>

          <div className="absolute inset-y-0 left-3 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft size={26} />
            </Button>
          </div>

          <div className="absolute inset-y-0 right-3 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight size={26} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((z) => !z)}
            className="absolute right-4 bottom-4 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            {zoom ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImages;

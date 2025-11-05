'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Input } from '../ui/input';

interface AddImageButtonProps {
  image?: string;
  size?:
    | 'size-[4.5rem]'
    | 'size-20'
    | 'size-24'
    | 'size-28'
    | 'size-32'
    | 'size-40';
  onImageChange: (url: string | string[]) => void;
  onImageRemove: () => void;
  onClick?: () => void;
  disabled?: boolean;
  multiple?: boolean;
}

export const AddImageButton = ({
  image,
  onImageChange,
  onImageRemove,
  onClick,
  size = 'size-24',
  disabled = false,
  multiple = false,
}: AddImageButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [image]);

  const handleClick = () => {
    if (!disabled) {
      if (!image) {
        fileInputRef.current?.click();
      } else if (onClick) {
        onClick();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (multiple) {
        const urls: string[] = [];
        let loadedCount = 0;
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const url = e.target?.result as string;
            urls.push(url);
            loadedCount++;
            if (loadedCount === files.length) {
              onImageChange(urls);
            }
          };
          reader.readAsDataURL(file);
        });
      } else {
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const url = e.target?.result as string;
            onImageChange(url);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageRemove();
  };

  return (
    <div className="relative">
      <div
        className={`relative aspect-square ${size} rounded-md border-2 border-dashed transition-colors ${
          image
            ? 'border-transparent'
            : 'cursor-pointer border-gray-300 hover:border-gray-400'
        } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
        onClick={handleClick}
      >
        {image ? (
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt="Selected"
              fill
              className={`rounded-md border object-cover shadow ${onClick ? 'cursor-pointer' : ''}`}
            />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full border border-white bg-black/70 text-white hover:bg-red-500 hover:text-white"
              disabled={disabled}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
            <Plus size={24} />
            <span className="mt-2 text-xs">Add Image</span>
          </div>
        )}
      </div>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
        multiple={multiple}
      />
    </div>
  );
};

import { ProductForm } from '@/components/Forms/ProductForm';
import { X } from 'lucide-react';

interface AddProductProps {
  subcategoryName: string;
  title?: string;
  handleCancel: () => void;
  onSubmit: (data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    subcategoryId: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  editingProduct?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    subcategoryId: string;
  };
}

const AddProduct = ({
  subcategoryName,
  title,
  onSubmit,
  isSubmitting,
  editingProduct,
  handleCancel,
}: AddProductProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mb-7 flex w-full max-w-5xl items-center justify-between">
        <h2 className="text-start text-xl text-neutral-500 md:text-2xl">
          {editingProduct ? (
            <p>
              Editing{' '}
              <span className="font-medium text-neutral-900">
                {editingProduct.name}
              </span>
            </p>
          ) : (
            <p>
              Add New Product{' '}
              {subcategoryName && (
                <span className="font-medium text-neutral-900">to {title}</span>
              )}
            </p>
          )}
        </h2>

        <button
          type="button"
          onClick={handleCancel}
          tabIndex={-1}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-neutral-100 font-medium hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 md:size-10"
          disabled={isSubmitting}
        >
          <X strokeWidth={1.5} size={20} />
        </button>
      </div>

      <ProductForm
        onSubmit={onSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        initialData={editingProduct}
        subcategoryName={subcategoryName}
      />
    </div>
  );
};

export default AddProduct;

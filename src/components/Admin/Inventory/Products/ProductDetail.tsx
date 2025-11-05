'use client';

import { BackButton } from '@/components/Buttons/BackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductWithStats } from '@/types/product';
import axios from 'axios';
import { Pen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddProduct from './AddProduct';
import OrdersTab from './ProductDetailTabs/OrdersTab';
import OverviewTab from './ProductDetailTabs/OverviewTab';
import ReviewsTab from './ProductDetailTabs/ReviewsTab';
import VariantsTab from './ProductDetailTabs/VariantsTab';

const ProductDetail = ({ product }: { product: ProductWithStats }) => {
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'variants', label: 'Variants' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'orders', label: 'Orders' },
  ];

  const handleSubmit = async (data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
  }) => {
    setIsSubmitting(true);
    try {
      await axios.put(`/api/admin/inventory/products/${product.id}`, {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        images: data.images,
        subcategoryId: product.subcategoryId,
        tags: product.tags,
      });

      setIsSubmitting(false);
      setIsEditingProduct(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
    }
  };

  const handleCancel = () => {
    setIsEditingProduct(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transform product data to match AddProduct interface
  const editingProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    images: product.images,
    subcategoryId: product.subcategoryId,
    catalog: product.subcategory?.category?.catalog?.name || '',
    category: product.subcategory?.category?.name || '',
    subcategory: product.subcategory?.name || '',
    variants: product.colors.map((color) => ({
      color: color.color,
      sizes: color.variants.map((variant) => ({
        size: variant.size,
        quantity: variant.quantity,
      })),
    })),
  };

  if (isEditingProduct) {
    return (
      <AddProduct
        subcategoryName={product.subcategory?.name || ''}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        editingProduct={editingProduct}
        handleCancel={handleCancel}
      />
    );
  }

  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

        <div className="flex items-center justify-between space-x-4">
          <BackButton />

          <button
            className="flex h-9 w-24 cursor-pointer items-center justify-center gap-2 rounded-4xl border border-neutral-400 hover:border-black"
            onClick={() => setIsEditingProduct(true)}
          >
            <Pen className="-mt-0.5 -ml-1 size-4" />
            Edit
          </button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex space-x-2 rounded-none bg-white md:space-x-7">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="cursor-pointer border-b-1 border-transparent px-1 pt-2 pb-1.5 text-sm font-semibold text-black uppercase data-[state=active]:border-b-[2.5px] data-[state=active]:border-black md:text-base"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab product={product} />
        </TabsContent>

        <TabsContent value="variants" className="mt-6">
          <VariantsTab product={product} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <ReviewsTab productId={product.id} />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <OrdersTab productId={product.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;

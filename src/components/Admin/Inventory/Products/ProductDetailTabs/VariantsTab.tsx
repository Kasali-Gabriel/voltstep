'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { colorHexCodes } from '@/data/colorData';
import { useAdminSidebarStore } from '@/lib/state';
import { ProductWithStats } from '@/types/product';
import axios from 'axios';
import { Edit2, Package, Save, X } from 'lucide-react';
import { useState } from 'react';

interface EditingVariant {
  colorId: string;
  variantId: string;
  quantity: number;
}

const VariantsTab = ({ product }: { product: ProductWithStats }) => {
  const [editingVariant, setEditingVariant] = useState<EditingVariant | null>(
    null,
  );
  const [variants, setVariants] = useState(product.colors);
  const [saving, setSaving] = useState(false);

  const { showSidebar } = useAdminSidebarStore();

  const startEditing = (
    colorId: string,
    variantId: string,
    currentQuantity: number,
  ) => {
    setEditingVariant({ colorId, variantId, quantity: currentQuantity });
  };

  const cancelEditing = () => {
    setEditingVariant(null);
  };

  const saveVariant = async () => {
    if (!editingVariant) return;

    setSaving(true);

    try {
      const { variantId, quantity, colorId } = editingVariant;

      await axios.put(`/api/admin/inventory/products/variants/${variantId}`, {
        quantity,
      });

      setVariants((prev) =>
        prev.map((color) =>
          color.id === colorId
            ? {
                ...color,
                variants: color.variants.map((variant) =>
                  variant.id === variantId ? { ...variant, quantity } : variant,
                ),
              }
            : color,
        ),
      );

      setEditingVariant(null);
    } catch (error) {
      console.error('Error updating variant:', error);
    } finally {
      setSaving(false);
    }
  };

  const getTotalQuantityForColor = (color: (typeof variants)[0]) => {
    return color.variants.reduce((sum, variant) => sum + variant.quantity, 0);
  };

  const getTotalQuantity = () => {
    return variants.reduce(
      (sum, color) => sum + getTotalQuantityForColor(color),
      0,
    );
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'bg-red-500' };

    if (quantity < 10) return { text: 'Low Stock', color: 'bg-yellow-500' };

    return { text: 'In Stock', color: 'bg-green-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Product Variants</h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Package size={16} className="text-gray-500" />

            <span className="text-sm text-gray-600">Total Stock:</span>

            <Badge variant="outline" className="font-semibold">
              {getTotalQuantity()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {variants.map((color) => (
          <Card key={color.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="h-6 w-6 rounded-full border-2 border-gray-300"
                    style={{
                      backgroundColor:
                        colorHexCodes[
                          color.color as keyof typeof colorHexCodes
                        ] || color.color.toLowerCase(),
                    }}
                    title={color.color}
                  />

                  <span className="capitalize">{color.color}</span>
                </div>

                <Badge variant="secondary">
                  {getTotalQuantityForColor(color)} total
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${showSidebar ? 'lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-4'}`}
              >
                {color.variants.map((variant) => {
                  const isEditing = editingVariant?.variantId === variant.id;
                  const stockStatus = getStockStatus(variant.quantity);

                  return (
                    <div
                      key={variant.id}
                      className="space-y-3 rounded-lg border p-4 transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{variant.size}</span>

                        <div
                          className={`h-2 w-2 rounded-full ${stockStatus.color}`}
                        />
                      </div>

                      {isEditing ? (
                        <div className="space-y-3">
                          <Input
                            type="number"
                            min="0"
                            value={editingVariant.quantity}
                            onChange={(e) =>
                              setEditingVariant({
                                ...editingVariant,
                                quantity: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full"
                            autoFocus
                          />

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={saveVariant}
                              disabled={saving}
                              className="flex-1"
                            >
                              <Save size={14} className="mr-1" />
                              Save
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEditing}
                              disabled={saving}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Quantity:
                            </span>

                            <span className="font-semibold">
                              {variant.quantity}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Status:
                            </span>

                            <span className="text-xs font-medium">
                              {stockStatus.text}
                            </span>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              startEditing(
                                color.id,
                                variant.id,
                                variant.quantity,
                              )
                            }
                            className="w-full"
                          >
                            <Edit2 size={14} className="mr-1" />
                            Edit
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VariantsTab;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types/order';
import Image from 'next/image';
import Link from 'next/link';

const OrderItems = ({ items }: { items: Order['items'] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <Link href={`/product/${item.product.slug}`}>
                  <h4 className="font-medium hover:underline hover:underline-offset-4">
                    {item.product.name}
                  </h4>
                </Link>

                <p className="text-sm text-gray-500">
                  {item.color} {item.size && `• ${item.size}`}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="text-sm text-gray-500">
                  Price: ${item.price.toFixed(2)} each
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;

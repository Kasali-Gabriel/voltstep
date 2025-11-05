import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderDeliveryAddressProps } from '@/types/order';
import { MapPin } from 'lucide-react';

const OrderDeliveryAddress = ({
  deliveryAddress,
  status,
}: OrderDeliveryAddressProps) => {
  if (!deliveryAddress) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {status === 'DELIVERED' ? 'Delivered To' : 'Delivery Address'}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="text-sm">
          <p>
            {deliveryAddress.firstName} {deliveryAddress.lastName}
          </p>

          <p className="font-medium">{deliveryAddress.addressLine1}</p>
          {deliveryAddress.addressLine2 && (
            <p>{deliveryAddress.addressLine2}</p>
          )}

          <p className="text-neutral-600">
            {deliveryAddress.city}, {deliveryAddress.state}{' '}
            {deliveryAddress.zipCode}
          </p>

          <p className="text-neutral-600">{deliveryAddress.country}</p>

          <p>{deliveryAddress.phone}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDeliveryAddress;

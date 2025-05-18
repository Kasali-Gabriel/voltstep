import { useCartStore } from '@/hooks/use-cart';

const FREE_SHIPPING_THRESHOLD = 100;

const getColor = (value: number) => {
  if (value < 20) return '#fde047';
  if (value < 40) return '#facc15';
  if (value < 60) return '#a3e635';
  if (value < 80) return '#4ade80';
  if (value < 100) return '#22c55e';
  return '#16a34a';
};

const ShippingProgress = () => {
  const { getSubTotal } = useCartStore();
  const subTotal = parseFloat(getSubTotal());
  const progress = Math.min((subTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountLeft = Math.max(FREE_SHIPPING_THRESHOLD - subTotal, 0);

  return (
    <div>
      {progress < 100 ? (
        <div className="mb-2 text-sm text-neutral-600">
          You are{' '}
          <span className="font-semibold">${amountLeft.toFixed(2)}</span> away
          from <span className="font-semibold">Free standard shipping</span>!
        </div>
      ) : (
        <div className="mb-2 text-sm font-semibold">
          You have qualified for Free standard shipping!
        </div>
      )}

      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full transition-colors duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(progress),
          }}
        />
      </div>
    </div>
  );
};

export default ShippingProgress;

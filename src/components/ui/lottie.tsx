'use client';

import HeartAnimationData from '@/assets/Heart.json';
import LogoutAnimationData from '@/assets/Logout.json';
import OrdersAnimationData from '@/assets/OrderHistory.json';
import SearchAnimationData from '@/assets/Search.json';
import SettingsAnimationData from '@/assets/setting.json';
import AdminAnimationData from '@/assets/Shield.json';
import SuccessAnimationData from '@/assets/Success.json';
import BagAnimationData from '@/assets/Bag.json';
import Lottie, { LottieRef, LottieRefCurrentProps } from 'lottie-react';
import { forwardRef } from 'react';

export const OrderHistoryLottie = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-8">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={OrdersAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

OrderHistoryLottie.displayName = 'OrderHistoryLottie';

export const AdminDashboardLottie = forwardRef<LottieRefCurrentProps>(
  (props, ref) => {
    return (
      <div className="size-8">
        <Lottie
          lottieRef={ref as LottieRef}
          animationData={AdminAnimationData}
          className="flex items-center justify-center"
          autoplay={false}
          loop={true}
        />
      </div>
    );
  },
);

AdminDashboardLottie.displayName = 'AdminDashboardLottie';

export const SearchLottie = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-7 cursor-pointer">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={SearchAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

SearchLottie.displayName = 'SearchLottie';

export const SettingsLottie = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-8">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={SettingsAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

SettingsLottie.displayName = 'SettingsLottie';

export const LogoutLottie = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-8">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={LogoutAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

LogoutLottie.displayName = 'LogoutLottie';

export const HeartLottie = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-8">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={HeartAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

HeartLottie.displayName = 'HeartLottie';

export const SuccessLottie = () => {
  return (
    <div className="size-52">
      <Lottie
        animationData={SuccessAnimationData}
        className="flex items-center justify-center"
        autoplay={true}
        loop={true}
      />
    </div>
  );
};

export const BagLottie = () => {
  return (
    <div className="size-36">
      <Lottie
        animationData={BagAnimationData}
        className="flex items-center justify-center"
        autoplay={true}
        loop={true}
      />
    </div>
  );
};

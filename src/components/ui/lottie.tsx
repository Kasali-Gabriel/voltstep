'use client';

import HeartAnimationData from '@/assets/Heart.json';
import logoutAnimationData from '@/assets/Logout.json';
import ordersAnimationData from '@/assets/OrderHistory.json';
import settingsAnimationData from '@/assets/setting.json';
import Lottie, { LottieRef, LottieRefCurrentProps } from 'lottie-react';
import { forwardRef } from 'react';

export const OrderHistory = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-8">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={ordersAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

OrderHistory.displayName = 'OrderHistory';

export const Settings = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-8">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={settingsAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

Settings.displayName = 'Settings';

export const Logout = forwardRef<LottieRefCurrentProps>((props, ref) => {
  return (
    <div className="size-8">
      <Lottie
        lottieRef={ref as LottieRef}
        animationData={logoutAnimationData}
        className="flex items-center justify-center"
        autoplay={false}
        loop={true}
      />
    </div>
  );
});

Logout.displayName = 'Logout';

export const Heart = forwardRef<LottieRefCurrentProps>((props, ref) => {
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

Heart.displayName = 'Heart';

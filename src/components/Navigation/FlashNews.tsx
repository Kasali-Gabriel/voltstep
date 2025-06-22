'use client';

import { Pause, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const messages = [
  '20% Student Discount 🎓',
  'Free Shipping on Orders Over $100 🚚',
  '10% Off for First-Time Customers 🎉',
];

export default function FlashNews() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (isPaused) return;
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isPaused, index]);

  const variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div
      className={`relative flex h-12 justify-end overflow-hidden bg-neutral-200 text-center text-sm font-semibold md:text-base ${pathName === '/' ? 'hidden' : ''}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={messages[index]}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 w-full -translate-y-1/2"
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => setIsPaused(!isPaused)}
        className="z-20 flex cursor-pointer items-center justify-end px-3 sm:px-10 xl:px-12"
      >
        {isPaused ? (
          <Play size={20} className="scale-90 fill-black sm:scale-100" />
        ) : (
          <Pause
            size={20}
            strokeWidth={1}
            className="scale-90 fill-black sm:scale-100"
          />
        )}
      </button>
    </div>
  );
}

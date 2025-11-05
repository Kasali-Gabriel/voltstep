import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { LottieRefCurrentProps } from 'lottie-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AdminDashboardLottie, HeartLottie, LogoutLottie, OrderHistoryLottie, SettingsLottie } from '../ui/lottie';

const UserProfile = () => {
  const settingsRef = useRef<LottieRefCurrentProps>(null);
  const ordersRef = useRef<LottieRefCurrentProps>(null);
  const logoutRef = useRef<LottieRefCurrentProps>(null);
  const heartRef = useRef<LottieRefCurrentProps>(null);
  const adminRef = useRef<LottieRefCurrentProps>(null);

  const { user } = useUser();

  const isAdmin = user?.publicMetadata.role === 'admin';

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="group hover:animate-sheen relative size-9 cursor-pointer border-4 border-transparent transition-all duration-300 before:absolute before:inset-0 before:w-[60%] before:-translate-x-full before:-skew-x-45 before:bg-gradient-to-l before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-1000 before:ease-out hover:before:translate-x-[200%] data-[state=open]:border-neutral-300">
          <AvatarImage src={user?.imageUrl ?? ''} alt={user?.firstName ?? ''} />

          <AvatarFallback>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 px-5 py-3 md:w-80">
        <div className="mb-6 flex items-center space-x-2">
          <Avatar className="pointer-events-none size-10">
            <AvatarImage
              src={user?.imageUrl ?? ''}
              alt={`${user?.firstName ?? ''}`}
            />

            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h2 className="truncate text-sm font-semibold sm:text-base">
              {user?.firstName} {user?.lastName}
            </h2>

            <p className="text-muted-foreground truncate text-xs md:text-sm">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <>
          <div className="flex items-center border-y border-neutral-100 px-1 py-3">
            <Link
              href="/account"
              className="flex items-center space-x-3 font-medium text-neutral-600 hover:text-black"
              onMouseEnter={() => settingsRef.current?.play()}
              onMouseLeave={() => settingsRef.current?.stop()}
              onClick={handleClick}
            >
              <SettingsLottie ref={settingsRef} />
              <p>Manage Account</p>
            </Link>
          </div>

          <div className="flex items-center border-b border-neutral-100 px-1 py-3">
            <Link
              href="/wishlist"
              className="flex items-center space-x-3 font-medium text-neutral-600 hover:text-black"
              onMouseEnter={() => heartRef.current?.play()}
              onMouseLeave={() => heartRef.current?.stop()}
              onClick={handleClick}
            >
              <HeartLottie ref={heartRef} />
              <p>Favorites</p>
            </Link>
          </div>

          <div className="flex items-center border-b border-neutral-100 px-1 py-3">
            <Link
              href="/orders"
              className="flex items-center space-x-3 font-medium text-neutral-600 hover:text-black"
              onMouseEnter={() => ordersRef.current?.play()}
              onMouseLeave={() => ordersRef.current?.stop()}
              onClick={handleClick}
            >
              <OrderHistoryLottie ref={ordersRef} />
              <p>Orders</p>
            </Link>
          </div>

          {isAdmin && (
            <div className="flex items-center border-b border-neutral-100 px-1 py-3">
              <Link
                href="/admin"
                className="flex items-center space-x-3 font-medium text-neutral-600 hover:text-black"
                onMouseEnter={() => adminRef.current?.play()}
                onMouseLeave={() => adminRef.current?.stop()}
                onClick={handleClick}
              >
                <AdminDashboardLottie ref={adminRef} />
                <p>Admin Dashboard</p>
              </Link>
            </div>
          )}

          <div className="flex items-center px-1 py-3">
            <SignOutButton>
              <button
                className="flex cursor-pointer items-center space-x-3 font-medium text-neutral-600 hover:text-black"
                onMouseEnter={() => logoutRef.current?.play()}
                onMouseLeave={() => logoutRef.current?.stop()}
                onClick={handleClick}
              >
                <LogoutLottie ref={logoutRef} />
                <p>Log Out</p>
              </button>
            </SignOutButton>
          </div>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;

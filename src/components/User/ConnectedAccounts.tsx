'use client';

import appleLogo from '@/assets/apple-logo.png';
import googleLogo from '@/assets/google-logo.png';
import { useReverification, useUser } from '@clerk/nextjs';
import {
  CreateExternalAccountParams,
  ExternalAccountResource,
  OAuthStrategy,
} from '@clerk/types';
import { EllipsisIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RemoveAccountDialog } from '../Dialogs/RemoveAccountDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

// Capitalize the first letter of the provider name
// E.g. 'discord' -> 'Discord'
const capitalize = (provider: string) => {
  return `${provider.slice(0, 1).toUpperCase()}${provider.slice(1)}`;
};

// Remove the 'oauth' prefix from the strategy string
// E.g. 'oauth_discord' -> 'discord'
// Used to match the strategy with the 'provider' field in externalAccounts
const normalizeProvider = (provider: string) => {
  return provider.split('_')[1];
};

export default function ConnectedAccounts() {
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );

  // Use Clerk's `useUser()` hook to get the current user's `User` object
  const { isLoaded, user } = useUser();
  const createExternalAccount = useReverification(
    (params: CreateExternalAccountParams) =>
      user?.createExternalAccount(params),
  );
  const accountDestroy = useReverification((account: ExternalAccountResource) =>
    account.destroy(),
  );

  // List the options the user can select when adding a new external account
  // Edit this array to include all of your enabled SSO connections
  const options: OAuthStrategy[] = ['oauth_google', 'oauth_apple'];

  // Handle adding the new external account
  const addSSO = async (strategy: OAuthStrategy) => {
    await createExternalAccount({
      strategy,
      redirectUrl: '/account',
    }).then((res) => {
      if (res?.verification?.externalVerificationRedirectURL) {
        router.push(res.verification.externalVerificationRedirectURL.href);
      }
    });
  };

  // Show a loading message until Clerk loads
  if (!isLoaded) return <p>Loading...</p>;

  // Find the external accounts from the options array that the user has not yet added to their account or is noy yet verified
  // This prevents showing an 'add' button for existing external account types
  const unconnectedOptions = options.filter(
    (option) =>
      !user?.externalAccounts
        .filter((account) => account.verification?.status === 'verified')
        .some((account) => account.provider === normalizeProvider(option)),
  );

  const getProviderIcon = (provider: string) => {
    const icons: Record<string, typeof googleLogo> = {
      google: googleLogo,
      apple: appleLogo,
    };
    return icons[provider] || null;
  };

  const renderProviderIcon = (provider: string) => {
    const icon = getProviderIcon(provider);
    if (!icon) return <span className="h-6 w-6 rounded bg-gray-300"></span>;

    return (
      <Image
        src={icon}
        alt={`${provider} logo`}
        width={24}
        height={24}
        className="h-6 w-6"
      />
    );
  };

  return (
    <div className="mt-2 w-full space-y-3">
      <h2 className="text-lg font-medium text-gray-900">Connected accounts</h2>

      {/* Connected Accounts List */}
      <div className="space-y-3">
        {user?.externalAccounts &&
          user.externalAccounts.length > 0 &&
          user.externalAccounts
            .filter((account) => account.verification?.status === 'verified')
            .map((account) => (
              <div key={account.id} className="flex flex-col space-y-2 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 scale-150 sm:scale-100">
                      {renderProviderIcon(account.provider)}
                    </div>

                    <div className="flex flex-col space-x-1 font-medium sm:flex-row sm:items-center md:space-x-2">
                      <h3 className="text-gray-900 capitalize">
                        {account.provider}
                      </h3>

                      {account.emailAddress && (
                        <>
                          <span className="hidden sm:block">•</span>
                          <p className="text-muted-foreground mt-0.5 text-sm">
                            {account.emailAddress}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Desktop: Direct Remove Button */}
                  <RemoveAccountDialog
                    account={account}
                    onRemove={accountDestroy}
                  >
                    <button
                      type="button"
                      className="hidden cursor-pointer text-sm font-medium text-red-600 underline decoration-2 underline-offset-[6px] transition-colors hover:text-red-500 sm:block sm:text-base md:text-lg"
                    >
                      Remove
                    </button>
                  </RemoveAccountDialog>

                  {/* Mobile: Dropdown with Ellipsis */}
                  <DropdownMenu
                    open={openDropdowns[account.id] || false}
                    onOpenChange={(open) =>
                      setOpenDropdowns((prev) => ({
                        ...prev,
                        [account.id]: open,
                      }))
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="flex cursor-pointer items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:hidden"
                      >
                        <EllipsisIcon size={16} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40">
                      <RemoveAccountDialog
                        account={account}
                        onRemove={accountDestroy}
                        onOpenChange={(open) => {
                          if (!open) {
                            // Close dropdown when dialog closes
                            setOpenDropdowns((prev) => ({
                              ...prev,
                              [account.id]: false,
                            }));
                          }
                        }}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                          onSelect={(e) => e.preventDefault()}
                        >
                          Remove
                        </DropdownMenuItem>
                      </RemoveAccountDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
      </div>

      {/* Add New Account Section */}
      {unconnectedOptions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-2 py-1 font-medium text-gray-700 hover:bg-neutral-200 hover:text-black">
              <PlusIcon size={20} />
              <span>Connect account</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-72">
            {unconnectedOptions.map((strategy) => {
              const provider = normalizeProvider(strategy);
              return (
                <DropdownMenuItem
                  key={strategy}
                  onClick={() => addSSO(strategy)}
                  className="flex cursor-pointer items-center space-x-3 focus:bg-neutral-200 focus:text-black"
                >
                  <div className="flex-shrink-0">
                    {renderProviderIcon(provider)}
                  </div>
                  <span className="font-medium">{capitalize(provider)}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

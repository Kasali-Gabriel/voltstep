import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Loader from '@/components/ui/loader';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { User } from '@/types/admin';
import { ChevronDown } from 'lucide-react';

type RoleAction = 'set-admin' | 'set-moderator' | 'remove';

interface RoleButtonProps {
  action: RoleAction;
  user: User;
  isAdmin: boolean;
  updatingState: { userId: string; action: string } | null;
  onRoleChange: (userId: string, action: string) => void;
  variant?: 'desktop' | 'mobile';
}

interface RoleMenuItemProps {
  action: RoleAction;
  user: User;
  isAdmin: boolean;
  updatingState: { userId: string; action: string } | null;
  onRoleChange: (userId: string, action: string) => void;
}

export const UserRoleItem = ({
  user,
  onRoleChange,
  updatingState,
  isAdmin,
}: {
  user: User;
  onRoleChange: (userId: string, action: string) => void;
  updatingState: { userId: string; action: string } | null;
  isAdmin: boolean;
}) => {
  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId,
  );

  // Helper function to get tooltip content
  const getTooltipContent = (
    action: RoleAction,
    user: User,
    isAdmin: boolean,
  ): string => {
    if (!isAdmin) return 'Only admins can change roles';

    switch (action) {
      case 'set-admin':
        return user.publicMetadata.role === 'admin'
          ? 'User is already an admin'
          : '';
      case 'set-moderator':
        return user.publicMetadata.role === 'moderator'
          ? 'User is already a moderator'
          : '';
      default:
        return '';
    }
  };

  // Helper function to check if button should be disabled
  const isDisabled = (
    action: RoleAction,
    user: User,
    isAdmin: boolean,
    updatingState: { userId: string; action: string } | null,
  ): boolean => {
    if (!isAdmin) return true;
    if (updatingState?.userId === user.id && updatingState?.action === action)
      return true;

    switch (action) {
      case 'set-admin':
        return user.publicMetadata.role === 'admin';
      case 'set-moderator':
        return user.publicMetadata.role === 'moderator';
      case 'remove':
        return !user.publicMetadata.role;
      default:
        return false;
    }
  };

  // Helper function to get button text
  const getButtonText = (action: RoleAction): string => {
    switch (action) {
      case 'set-admin':
        return 'Set Admin';
      case 'set-moderator':
        return 'Set Moderator';
      case 'remove':
        return 'Remove Role';
      default:
        return '';
    }
  };

  // Helper function to get button styles
  const getButtonStyles = (action: RoleAction): string => {
    const baseStyles =
      'flex h-9 w-28  items-center justify-center rounded-4xl border border-neutral-300 bg-white text-sm hover:border-gray-500  lg:h-10 lg:w-32 lg:text-base';

    switch (action) {
      case 'set-admin':
        return baseStyles.replace(
          'hover:border-gray-500',
          'hover:border-blue-500 hover:bg-blue-100',
        );
      case 'set-moderator':
        return baseStyles
          .replace('w-28', 'w-32')
          .replace('lg:w-32', 'lg:w-36')
          .replace(
            'hover:border-gray-500',
            'hover:border-green-500 hover:bg-green-100',
          );
      case 'remove':
        return baseStyles
          .replace('w-28', 'w-32')
          .replace('lg:w-32', 'lg:w-36')
          .replace('bg-white', 'bg-red-500')
          .replace('text-sm', 'px-4 text-sm text-white')
          .replace(
            'hover:border-gray-500 ',
            'hover:bg-red-400 hover:border-red-400',
          );
      default:
        return baseStyles;
    }
  };

  // Reusable Role Button Component
  const RoleButton = ({
    action,
    user,
    isAdmin,
    updatingState,
    onRoleChange,
    variant = 'desktop',
  }: RoleButtonProps) => {
    const isUpdating =
      updatingState?.userId === user.id && updatingState?.action === action;
    const loaderSize = variant === 'mobile' ? 16 : 24;
    const disabled = isDisabled(action, user, isAdmin, updatingState);
    const tooltipContent = getTooltipContent(action, user, isAdmin);

    const button = (
      <button
        onClick={() => !disabled && onRoleChange(user.id, action)}
        className={`${getButtonStyles(action)} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        {isUpdating ? (
          <Loader
            size={loaderSize}
            borderWidth="2px"
            color={action === 'remove' ? 'white' : 'black'}
          />
        ) : (
          getButtonText(action)
        )}
      </button>
    );

    if (!tooltipContent) {
      return button;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent className="bg-white border mb-2 text-neutral-900 shadow-md">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    );
  };

  // Reusable Role Menu Item Component
  const RoleMenuItem = ({
    action,
    user,
    isAdmin,
    updatingState,
    onRoleChange,
  }: RoleMenuItemProps) => {
    const isUpdating =
      updatingState?.userId === user.id && updatingState?.action === action;
    const tooltipContent = getTooltipContent(action, user, isAdmin);
    const disabled = isDisabled(action, user, isAdmin, updatingState);

    const content = (
      <div className="w-full">
        {isUpdating ? (
          <Loader size={16} borderWidth="2px" color="black" />
        ) : (
          getButtonText(action)
        )}
      </div>
    );

    return (
      <DropdownMenuItem
        onClick={() => !disabled && onRoleChange(user.id, action)}
        disabled={disabled}
      >
        {tooltipContent ? (
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        ) : (
          content
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <div className="w-full rounded-xl border border-neutral-300 bg-neutral-50 p-4 pt-6">
      <div className="flex flex-col space-y-5 md:space-y-0">
        {/* User Info */}
        <div>
          <h3 className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600">{primaryEmail?.emailAddress}</p>
          <p className="mt-1 text-sm text-gray-500">
            Current Role:{' '}
            <span className="font-medium">
              {(user.publicMetadata.role as string) || 'User'}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex h-full w-full items-end justify-end gap-2">
          {/* Desktop buttons */}
          <div className="hidden gap-2 lg:flex">
            <RoleButton
              action="set-admin"
              user={user}
              isAdmin={isAdmin}
              updatingState={updatingState}
              onRoleChange={onRoleChange}
            />
            <RoleButton
              action="set-moderator"
              user={user}
              isAdmin={isAdmin}
              updatingState={updatingState}
              onRoleChange={onRoleChange}
            />
            <RoleButton
              action="remove"
              user={user}
              isAdmin={isAdmin}
              updatingState={updatingState}
              onRoleChange={onRoleChange}
            />
          </div>

          {/* Mobile dropdown */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {!isAdmin ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="flex h-9 w-28 cursor-pointer items-center justify-center rounded-4xl border border-neutral-300 bg-white text-sm hover:border-gray-500 hover:bg-gray-100 lg:h-10 lg:w-32 lg:text-base">
                        Actions <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Only admins can change roles
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <button className="flex h-9 w-28 cursor-pointer items-center justify-center rounded-4xl border border-neutral-300 bg-white text-sm hover:border-gray-500 hover:bg-gray-100 lg:h-10 lg:w-32 lg:text-base">
                    Actions <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <RoleMenuItem
                  action="set-admin"
                  user={user}
                  isAdmin={isAdmin}
                  updatingState={updatingState}
                  onRoleChange={onRoleChange}
                />

                <RoleMenuItem
                  action="set-moderator"
                  user={user}
                  isAdmin={isAdmin}
                  updatingState={updatingState}
                  onRoleChange={onRoleChange}
                />

                <RoleMenuItem
                  action="remove"
                  user={user}
                  isAdmin={isAdmin}
                  updatingState={updatingState}
                  onRoleChange={onRoleChange}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

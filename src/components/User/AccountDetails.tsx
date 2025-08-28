import { useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
import { useState } from 'react';
import DeleteAccountDialog from '../Dialogs/DeleteAccountDialog';
import PasswordDialog from '../Dialogs/PasswordDialog';
import UpdateProfileDialog from '../Dialogs/UpdateProfileDialog';
import UpdateEmailForm from '../Forms/UpdateEmailForm';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ConnectedAccounts from './ConnectedAccounts';

const AccountDetails = () => {
  const { user } = useUser();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  return (
    <div className="flex w-full flex-col space-y-7 sm:w-4/5 sm:pl-20 xl:w-2/3 xl:pl-36">
      <h2 className="mb-4 text-2xl sm:text-3xl">Account Details</h2>

      {/* Profile */}
      <div className="mt-2 flex w-full flex-col space-y-3">
        <h3 className="text-lg font-medium">Profile</h3>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-5">
            <Avatar className="pointer-events-none size-10 md:size-12">
              <AvatarImage src={user?.imageUrl} alt={`${user?.firstName}`} />

              <AvatarFallback>
                <User size={20} strokeWidth={1.25} />
              </AvatarFallback>
            </Avatar>

            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>
          </div>

          <button
            className="cursor-pointer text-sm font-medium underline decoration-2 underline-offset-[6px] hover:text-neutral-600 sm:text-base md:text-lg"
            onClick={() => setIsProfileDialogOpen(true)}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="mt-2 flex w-full flex-col space-y-3">
        <h3 className="text-lg font-medium">Password</h3>

        <div className="flex w-full items-center justify-between">
          <span>
            {user?.passwordEnabled ? '•••••••••••••••' : '--------------------'}
          </span>

          <button
            className="cursor-pointer text-sm font-medium underline decoration-2 underline-offset-[6px] hover:text-neutral-600 sm:text-base md:text-lg"
            onClick={() => setIsPasswordDialogOpen(true)}
          >
            {user?.passwordEnabled ? 'Change' : 'Add'}
          </button>
        </div>
      </div>

      {/* Email Address */}
      <div className="mt-2 flex w-full flex-col space-y-3">
        <h3 className="text-lg font-medium">Email Address</h3>

        <UpdateEmailForm user={user!} />
      </div>

      {/* Connected Accounts */}
      <ConnectedAccounts />

      {/* Delete account */}
      <div className="mt-2 flex w-full justify-between">
        <h3 className="text-lg font-medium">Delete Account</h3>

        <DeleteAccountDialog />
      </div>

      <UpdateProfileDialog
        isOpen={isProfileDialogOpen}
        setIsOpen={setIsProfileDialogOpen}
        firstName={user?.firstName || ''}
        lastName={user?.lastName || ''}
        profileImageUrl={user?.imageUrl}
      />

      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        setIsOpen={setIsPasswordDialogOpen}
      />
    </div>
  );
};

export default AccountDetails;

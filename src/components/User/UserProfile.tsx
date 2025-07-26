import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserContextType } from '@/context/UserContext';
import { User as USER } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// TODO: create similar dropdown menu to clerk user button with img,names, email, manage accouunt, wishlist, orders, logout. manage account should have profiles detail page with name change, profile picture upload and remove, add new email[createEmailAddress()], add external account like google or apple [createExternalAccount()], create or update password[updatePassword()], and delete account [deleteUser()].
const UserProfile = ({ user }: { user: UserContextType }) => {
  // const { user: clerkuser } = useUser();
  // // clerkuser?.externalAccounts, clerkuser?.createEmailAddress, clerkuser?.createExternalAccount, clerkuser?.updatePassword, clerkuser?.delete, clerkuser?.imageUrl, clerkuser?.firstName, clerkuser?.lastName; clerkuser?.emailAddresses, clerkuser?.updatePassword, clerkuser?.createPhoneNumber,clerkuser?.setProfileImage, clerkuser?.phoneNumbers, clerkuser?.getSessions,clerkuser?.reload, clerkuser?.update ;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer transition-all duration-300">
          <AvatarImage src={user.imageUrl ?? ''} alt={`${user.firstName}`} />

          <AvatarFallback>
            <USER size={20} strokeWidth={1.25} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;

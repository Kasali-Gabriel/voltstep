import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserContextType } from '@/context/UserContext';
import { User as USER } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const UserProfile = ({ user }: { user: UserContextType }) => {
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

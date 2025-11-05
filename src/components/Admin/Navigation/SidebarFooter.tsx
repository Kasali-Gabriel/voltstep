import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { ArrowLeft, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const SideBarFooter = () => {
  const { user } = useUser();
  const { state } = useSidebar();

  return (
    <SidebarFooter className="bg-background rounded-2xl">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                disabled={state === 'collapsed'}
                className="h-12 w-full cursor-pointer disabled:opacity-100"
              >
                <div className="flex items-center space-x-2">
                  <Avatar
                    className={`transition ${state === 'collapsed' ? '-ml-1.5! size-7' : 'size-9'}`}
                  >
                    <AvatarImage src={user?.imageUrl || ''} />

                    <AvatarFallback>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <span className="flex flex-col">
                    <p className="truncate text-sm">
                      {user?.firstName} {user?.lastName}
                    </p>

                    <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </span>
                </div>

                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              className="w-[var(--radix-popper-anchor-width)] rounded-lg border border-neutral-300 bg-neutral-50 p-1.5 shadow-sm"
            >
              <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-stone-200">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-2 size-5" />
                  Return to Shop
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default SideBarFooter;

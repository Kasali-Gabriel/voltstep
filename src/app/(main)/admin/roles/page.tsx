'use client';

import { UserRoleItem } from '@/components/Admin/UserRoleItem';
import { Pagination, usePagination } from '@/components/Navigation/Pagination';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/loader';
import { User } from '@/types/admin';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search, UserCheck, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// 🔎 Search Component
const SearchUsers = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div className="pt-6">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 transform text-gray-500" />
        <Input
          placeholder="Search users by name or email..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          className="rounded-4xl pl-10"
        />
      </div>
    </div>
  );
};

const Roles = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [updatingState, setUpdatingState] = useState<{
    userId: string;
    action: string;
  } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { page, setPage, totalPages, start, end } = usePagination({
    totalItems: users.length,
    pageSize: 10,
    scrollRef,
  });

  // Reset page when search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedTerm, setPage]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch users on search
  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedTerm) {
        setUsers([]);
        return;
      }
      setIsSearching(true);
      try {
        const { data } = await axios.get(
          `/api/admin/role?query=${encodeURIComponent(debouncedTerm)}`,
        );
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchUsers();
  }, [debouncedTerm]);

  // Handle role changes
  const handleRoleChange = async (userId: string, action: string) => {
    setUpdatingState({ userId, action });
    try {
      const { data } = await axios.post('/api/admin/role', {
        userId,
        action,
      });

      if (data.success) {
        // Find the user to get their name for the toast
        const user = users.find((u) => u.id === userId);
        const userName = user ? `${user.firstName} ${user.lastName}` : 'User';

        // Update local state
        let newRole: string | undefined;
        if (action === 'set-admin') newRole = 'admin';
        else if (action === 'set-moderator') newRole = 'moderator';
        else if (action === 'remove') newRole = undefined;

        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  publicMetadata: {
                    ...user.publicMetadata,
                    role: newRole,
                  },
                }
              : user,
          ),
        );

        // Show success toast
        let actionText = '';
        if (action === 'set-admin') actionText = 'has been made an Admin';
        else if (action === 'set-moderator')
          actionText = 'has been made a Moderator';
        else if (action === 'remove') actionText = 'role has been removed';

        toast('Role changed successfully', {
          description: (
            <p>
              <span className="font-semibold">{userName}</span> {actionText}.
            </p>
          ),
        });
      } else {
        console.error('Failed to update role:', data.message);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setUpdatingState(null);
    }
  };

  return (
    <div className="container mx-auto w-full max-w-4xl space-y-6">
      <h2 className="mb-2 text-2xl font-bold">User Roles Management</h2>

      {/* Admin check message */}
      {!isAdmin && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Admin Access Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Only administrators can manage user roles. Contact an admin if
                  you need access to this functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <SearchUsers value={searchTerm} onChange={setSearchTerm} />

      {/* Results */}
      <div ref={scrollRef} className="w-full space-y-4">
        {isSearching && (
          <div className="py-8 text-center">
            <div className="mb-4 h-full w-full justify-items-center">
              <Loader size={32} borderWidth="2px" color="black" />
            </div>

            <p className="text-gray-500">
              Searching users for{' '}
              <span className="text-lg font-medium italic">{searchTerm}</span>
            </p>
          </div>
        )}

        {!isSearching &&
          users
            .slice(start, end)
            .map((user) => (
              <UserRoleItem
                key={user.id}
                user={user}
                onRoleChange={handleRoleChange}
                updatingState={updatingState}
                isAdmin={isAdmin}
              />
            ))}

        {/* Empty States */}
        {debouncedTerm && users.length === 0 && !isSearching && (
          <div className="py-8 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">
              No users found for &ldquo;{debouncedTerm}&rdquo;
            </p>
          </div>
        )}

        {!debouncedTerm && (
          <div className="py-8 text-center">
            <UserCheck className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">
              Start typing to search for users and manage their roles
            </p>
          </div>
        )}
      </div>

      {users.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          start={start}
          end={end}
          totalItems={users.length}
          itemLabel="users"
        />
      )}
    </div>
  );
};

export default Roles;

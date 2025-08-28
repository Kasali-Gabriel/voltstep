'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fetchData } from '@/lib/fetch';
import { User } from '@/types/admin';
import { Search, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Roles({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.search || '');
  const [isSearching, setIsSearching] = useState(false);

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    setIsSearching(true);
    try {
      const result = await fetchData<{ users: User[] }>(
        `/api/admin/users/search?query=${encodeURIComponent(query)}`,
        { noStore: true },
      );
      if (result && result.users) {
        setUsers(result.users);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setUsers([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRoleChange = async (userId: string, action: 'set' | 'remove') => {
    try {
      const response = await fetch('/api/admin/users/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          action,
          role: action === 'set' ? 'admin' : undefined,
        }),
      });

      if (response.ok) {
        // Refresh the user list
        if (searchTerm) {
          await searchUsers(searchTerm);
        }
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  useEffect(() => {
    if (searchParams.search) {
      searchUsers(searchParams.search);
    }
  }, [searchParams.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers(searchTerm);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold">User Roles Management</h2>
        <p className="text-gray-600">
          Manage user roles and permissions. Search for users and assign or
          remove admin roles.
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => {
          const primaryEmail = user.emailAddresses.find(
            (email) => email.id === user.primaryEmailAddressId,
          );

          return (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-600">
                      {primaryEmail?.emailAddress}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Current Role:{' '}
                      <span className="font-medium">
                        {(user.publicMetadata.role as string) || 'User'}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleRoleChange(user.id, 'set')}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={user.publicMetadata.role === 'admin'}
                    >
                      Make Admin
                    </Button>

                    <Button
                      onClick={() => handleRoleChange(user.id, 'remove')}
                      variant="destructive"
                      disabled={!user.publicMetadata.role}
                    >
                      Remove Role
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {searchTerm && users.length === 0 && !isSearching && (
          <div className="py-8 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">
              No users found for &ldquo;{searchTerm}&rdquo;
            </p>
          </div>
        )}

        {!searchTerm && (
          <div className="py-8 text-center">
            <UserCheck className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="text-gray-500">
              Search for users to manage their roles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

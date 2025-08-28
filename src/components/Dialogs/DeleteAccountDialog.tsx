import { useReverification, useUser } from '@clerk/nextjs';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import Loader from '../ui/loader';

const DeleteAccountDialog = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  // Use reverification for secure account deletion
  const deleteAccount = useReverification(() => user?.delete());

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') {
      setError('Please type "DELETE" to confirm');
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      await deleteAccount();

      // Close dialog and redirect to home page immediately
      setIsDeleting(false);
      router.push('/');
    } catch (err) {
      console.error('Error deleting account:', err);

      // Handle specific error messages
      const error = err as {
        errors?: Array<{ message: string }>;
        message?: string;
      };
      if (error?.errors?.[0]?.message) {
        setError(error.errors[0].message);
      } else if (error?.message) {
        setError(error.message);
      } else {
        setError('Failed to delete account. Please try again.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-sm font-medium text-red-600 underline decoration-2 underline-offset-[6px] transition-colors hover:text-red-500 sm:text-base md:text-lg">
          Delete
        </button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center space-x-3">
            <div className="rounded-full bg-red-100 p-2">
              <Trash2Icon size={20} className="text-red-600" />
            </div>
            <DialogTitle className="font-semibold text-gray-900">
              Delete Account
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              This action cannot be undone. This will permanently delete your
              account and remove all of your data from our servers.
            </p>

            <div className="space-y-2">
              <p className="font-medium text-gray-800">This will delete:</p>
              <ul className="ml-2 list-inside list-disc space-y-1 text-gray-600">
                <li>Your profile and personal information</li>
                <li>All your orders and order history</li>
                <li>Your wishlist and saved items</li>
                <li>All connected social accounts</li>
              </ul>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Type{' '}
              <span className="font-mono font-bold text-red-600">DELETE</span>{' '}
              to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
                setError('');
              }}
              className="w-full rounded-3xl border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="DELETE"
              disabled={isDeleting}
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting || confirmText !== 'DELETE'}
            className="h-10 min-w-36 cursor-pointer rounded-3xl bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader size={24} borderWidth="3px" color="white" />
            ) : (
              'Delete Account'
            )}
          </button>

          <DialogClose asChild>
            <button
              className="h-10 cursor-pointer rounded-3xl bg-black px-6 text-sm font-medium text-white hover:bg-neutral-900"
              disabled={isDeleting}
            >
              Cancel
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;

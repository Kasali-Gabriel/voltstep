'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import Loader from '../ui/loader';

const DeleteRow = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Placeholder for delete logic. Keep this async so callers can await it.
      // Replace with real API call when implementing deletion.
      await Promise.resolve();
    } catch (error) {
      console.error('Error deleting rows:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" className="w-44 rounded-3xl">
          Delete Selected
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Selected Products</AlertDialogTitle>

          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex min-w-28 items-center justify-center rounded-4xl bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <Loader borderWidth="1.5px" color="white" />
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRow;

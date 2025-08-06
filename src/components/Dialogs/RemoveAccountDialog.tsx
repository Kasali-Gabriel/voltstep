import { RemoveAccountDialogProps } from '@/types/user';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export function RemoveAccountDialog({
  account,
  onRemove,
  children,
  onOpenChange,
}: RemoveAccountDialogProps) {
  const capitalize = (provider: string) => {
    return `${provider.slice(0, 1).toUpperCase()}${provider.slice(1)}`;
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="font-medium">
            Remove connected account
          </DialogTitle>

          <DialogDescription className="text-sm text-neutral-600">
            <span className="capitalize">{capitalize(account.provider)}</span>{' '}
            will be removed from this account. You will no longer be able to use
            this connected account to log in.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <DialogClose asChild>
            <button className="cursor-pointer text-lg font-medium text-neutral-600 hover:text-neutral-800">
              Cancel
            </button>
          </DialogClose>

          <button
            onClick={() => onRemove(account)}
            className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-400"
          >
            Remove
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

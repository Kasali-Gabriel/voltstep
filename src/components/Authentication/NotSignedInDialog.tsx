import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import SignedOut from './signedOut';

export const NotSignedInDialog = ({
  showDialog,
  setShowDialog,
  title,
  description,
}: {
  showDialog: boolean;
  title: string;
  description: string;
  setShowDialog: (open: boolean) => void;
}) => (
  <Dialog open={showDialog} onOpenChange={setShowDialog}>
    <DialogContent showCloseButton={false}>
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Not signed in</DialogTitle>
        </DialogHeader>
      </VisuallyHidden>

      <SignedOut title={title} description={description} isDialog={true} />
    </DialogContent>
  </Dialog>
);

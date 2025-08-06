import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import SignedOut from '../Authentication/signedOut';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

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

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import SignedOut from '../Authentication/signedOut';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export const NotSignedInDialog = ({
  showDialog,
  setShowDialog,
}: {
  showDialog: boolean;
  setShowDialog: (open: boolean) => void;
}) => (
  <Dialog open={showDialog} onOpenChange={setShowDialog}>
    <DialogContent >
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Not signed in</DialogTitle>
        </DialogHeader>
      </VisuallyHidden>

      <SignedOut
        title="💚 SAVE TO WISHLIST"
        description="Found something you adore? 💫 Your wishlist is the perfect place to keep all your favorite finds — outfits, accessories, and little obsessions — safe and easy to revisit anytime."
      />
    </DialogContent>
  </Dialog>
);

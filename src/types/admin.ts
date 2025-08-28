export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: {
    id: string;
    emailAddress: string;
  }[];
  primaryEmailAddressId: string | null;
  publicMetadata: {
    role?: string;
  };
}
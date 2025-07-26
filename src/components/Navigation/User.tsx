
import { fetchCatalogData } from '@/actions/products';
import { getUserById } from '@/actions/user';
import { auth } from '@clerk/nextjs/server';
import Wrapper from './Wrapper';

export type WrapperProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function User({ children }: WrapperProps) {
  const { userId } = await auth();

  const { user } = await getUserById({ clerkUserId: userId ?? '' });

    const catalogs = await fetchCatalogData();

  console.log('user:', user);

  const userContext = {
    id: user?.id ?? '',
    email: user?.email ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    imageUrl: user?.imageUrl ?? '',
  };

  return (
    <Wrapper catalogs={catalogs} user={userContext}>
      {children}
    </Wrapper>
  );
}

import { checkRole } from '@/actions/admin/roles';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasAdminRole = await checkRole('admin');
  const isModerator = await checkRole('moderator');

  if (!hasAdminRole && !isModerator) {
    redirect('/');
  }

  return <div>{children}</div>;
}

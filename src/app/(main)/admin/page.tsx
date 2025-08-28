import AdminPageContent from '@/components/Admin/AdminPageContent';
import { checkRole } from '@/utils/User/roles';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  // Check if user has admin role on the server side
  const hasAdminRole = await checkRole('admin');

  if (!hasAdminRole) {
    redirect('/');
  }

  return <AdminPageContent />;
}

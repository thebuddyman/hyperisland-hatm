import { cookies } from 'next/headers';
import { AppSidebar } from '@/components/app-sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RightSidebarProvider } from '@/components/context/right-sidebar-context';
import { auth } from '../(auth)/auth';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true' || true;

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <RightSidebarProvider>
        <AppSidebar user={session?.user} />
        <SidebarInset>{children}</SidebarInset>
        <RightSidebar />
      </RightSidebarProvider>
    </SidebarProvider>
  );
}
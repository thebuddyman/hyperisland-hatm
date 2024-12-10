import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { RightSidebar } from '@/components/right-sidebar';
// import { Sidebar } from '@/components/multimodal-input';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

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
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
      <RightSidebar />
      {/* <Sidebar/> */}
    </SidebarProvider>
  );
}
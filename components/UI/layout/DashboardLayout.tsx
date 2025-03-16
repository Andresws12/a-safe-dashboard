import Header from '@/components/common/header/header';
import { AppSidebar } from '@/components/common/navigation/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/UI/layout/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

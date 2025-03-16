import type { ReactNode } from 'react';

import DashboardLayout from '@/components/UI/layout/DashboardLayout';
type DashboardLayoutProps = { children: ReactNode };

export default function Layout({ children }: DashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

import NextImage from 'next/image';
import * as React from 'react';

import { NavMain } from '@/components/common/navigation/nav-main';
import { NavUser } from '@/components/common/navigation/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/UI/layout/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NextImage
          src="/logo.png"
          alt="Logo"
          width={120}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

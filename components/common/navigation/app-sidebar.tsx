import { BookOpen, GalleryVerticalEnd, SquareTerminal } from 'lucide-react';
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

// This is sample data.
const data = {
  user: {
    name: 'Andres',
    email: 'andres-hernandez.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Posts',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Listado',
          url: 'list',
        },
        {
          title: 'Crear',
          url: 'create',
        },
      ],
    },
  ],
};

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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

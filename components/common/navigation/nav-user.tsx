'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/UI/atoms/button';
import { SidebarMenu, SidebarMenuItem } from '@/components/UI/layout/sidebar';

export function NavUser() {
  const { data: session } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center">
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{session?.user?.name}</span>
          <span className="truncate text-xs">{session?.user?.email}</span>
        </div>
        <Button variant="link" onClick={() => signOut()}>
          <LogOut />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

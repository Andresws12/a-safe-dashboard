'use client';
import { Button } from '@/components/UI/atoms/button';
import { SidebarMenu, SidebarMenuItem } from '@/components/UI/layout/sidebar';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center">
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="truncate text-xs">{user.email}</span>
        </div>
        <Button variant="link" onClick={() => signOut()}>
          <LogOut />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

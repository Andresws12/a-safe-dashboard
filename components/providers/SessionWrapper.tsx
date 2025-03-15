'use client';

import { TRPCReactProvider } from '~/trpc/react';
import { SessionProvider } from 'next-auth/react';
interface SessionWrapperProps {
  children: React.ReactNode;
}

const SessionWrapper = ({ children }: SessionWrapperProps) => {
  return (
    <SessionProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </SessionProvider>
  );
};

export default SessionWrapper;

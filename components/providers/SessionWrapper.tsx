'use client';

import { SessionProvider } from 'next-auth/react';

import { TRPCReactProvider } from '~/trpc/react';
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

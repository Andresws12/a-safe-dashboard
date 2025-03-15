import type { ReactNode } from 'react';

type AuthLayoutProps = { children: ReactNode };

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      {children}
    </section>
  );
};

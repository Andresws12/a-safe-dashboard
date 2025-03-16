import type { ReactNode } from 'react';

type ListLayoutProps = { children: ReactNode };

export const ListLayout = ({ children }: ListLayoutProps) => {
  return (
    <section className="w-full  bg-background ">
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
};

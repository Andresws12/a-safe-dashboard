import React from 'react';

import { ScrollArea } from '@/components/UI/organisms/scroll-area';
import { cn } from '@/lib/utils';

export default function ContentLayout({
  children,
  scrollable = true,
  title = '',
  className = '',
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  title?: string;
  className?: string;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className={cn('h-full p-4 md:px-8', className)}>
            <h1 className="text-4xl font-bold m-6 my-5">{title} </h1>
            {children}
          </div>
        </ScrollArea>
      ) : (
        <div className={cn('h-full p-4 md:px-8', className)}>
          <h1 className="text-4xl font-bold m-6 my-1">{title} </h1>
          {children}
        </div>
      )}
    </>
  );
}

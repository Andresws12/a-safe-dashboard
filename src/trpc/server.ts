'use server';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';

import { createCaller, type AppRouter } from '@/src/server/api/root';
import { createTRPCContext } from '@/src/server/api/trpc';
import { createQueryClient } from './query-client';
import { getUrl } from './shared';
import { NextRequest } from 'next/server';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const newHeaders = new Headers();
  newHeaders.set('x-trpc-source', 'rsc');

  const request = new Request(getUrl(), {
    headers: newHeaders,
  });

  const nextRequest = new NextRequest(request);

  return createTRPCContext({
    headers: newHeaders,
    req: nextRequest,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);

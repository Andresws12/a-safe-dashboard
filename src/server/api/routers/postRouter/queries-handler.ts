import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import { listPostsSchema, postByIdSchema } from '~/server/schemas/postSchemas';
import { defaultPostSelect } from './postHelpers';

export const listPosts = async (input: z.infer<typeof listPostsSchema>) => {
  /**
   * For pagination docs you can have a look here
   * @see https://trpc.io/docs/v11/useInfiniteQuery
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
   */

  console.log('listPosts', input);
  const limit = input.limit ?? 50;
  const { cursor } = input;

  const items = await prisma.post.findMany({
    select: defaultPostSelect,
    // get an extra item at the end which we'll use as next cursor
    take: limit + 1,
    where: {},
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    orderBy: {
      createdAt: 'desc',
    },
  });
  let nextCursor: typeof cursor | undefined = undefined;
  if (items.length > limit) {
    // Remove the last item and use it as next cursor

    const nextItem = items.pop()!;
    nextCursor = nextItem.id;
  }

  return {
    items: items.reverse(),
    nextCursor,
  };
};

export const postById = async (input: z.infer<typeof postByIdSchema>) => {
  const { id } = input;
  const post = await prisma.post.findUnique({
    where: { id },
    select: defaultPostSelect,
  });
  if (!post) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No post with id '${id}'`,
    });
  }
  return post;
};

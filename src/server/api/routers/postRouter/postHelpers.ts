import type { Prisma } from '@prisma/client';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
export const defaultPostSelect = {
  id: true,
  title: true,
  text: true,
  test: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PostSelect;

/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
  addPostSchema,
  listPostsSchema,
  postByIdSchema,
} from '~/server/schemas/postSchemas';

import { addPost } from './mutation-handler';
import { listPosts, postById } from './queries-handler';

export const postRouter = createTRPCRouter({
  list: publicProcedure
    .input(listPostsSchema)
    .query(async ({ input }) => await listPosts(input)),
  byId: publicProcedure
    .input(postByIdSchema)
    .query(async ({ input }) => await postById(input)),
  add: publicProcedure
    .input(addPostSchema)
    .mutation(async ({ input }) => await addPost(input)),
});

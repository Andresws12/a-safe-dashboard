import { prisma } from '~/server/prisma';
import { defaultPostSelect } from './postHelpers';
import { addPostSchema } from '~/server/schemas/postSchemas';
import { z } from 'zod';

export const addPost = async (input: z.infer<typeof addPostSchema>) => {
  const post = await prisma.post.create({
    data: input,
    select: defaultPostSelect,
  });
  return post;
};

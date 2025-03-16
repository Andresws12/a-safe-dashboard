import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '~/server/prisma';
import { addPostSchema } from '~/server/schemas/postSchemas';

import { defaultPostSelect } from './postHelpers';

export const addPost = async (input: z.infer<typeof addPostSchema>) => {
  try {
    const validatedData = addPostSchema.parse(input);

    const postData = {
      ...validatedData,
      date: validatedData.date || new Date().toISOString().split('T')[0],
      readTime: validatedData.readTime || '5 min',
      author: validatedData.author || 'Anonymous',
    };

    if ('id' in postData) {
      delete postData.id;
    }

    const post = await prisma.post.create({
      data: postData,
      select: defaultPostSelect,
    });

    return post;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Datos de post inválidos: ${error.message}`,
        cause: error,
      });
    }

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'No se pudo crear el post',
      cause: error,
    });
  }
};

/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

import { signUpSchema } from '~/server/schemas/authSchemas';

import { TRPCError } from '@trpc/server';
import { prisma } from '~/server/prisma';

import { hash } from 'argon2';

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    const { username, email, password } = input;

    const exists = await prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User already exists.',
      });
    }

    const hashedPassword = await hash(password);

    const result = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });

    return {
      status: 201,
      message: 'Account created successfully',
      result: result.email,
    };
  }),
});

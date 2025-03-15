import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/db';

import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

import { verify } from 'argon2';

import { loginSchema } from '~/server/schemas/authSchemas';

const adapter = PrismaAdapter(prisma);

export const auth = NextAuth({
  adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, request) => {
        try {
          const creds = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findFirst({
            where: { email: creds.email },
          });

          if (!user || !user.password) {
            return null;
          }

          const isValidPassword = await verify(user.password, creds.password);
          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
});

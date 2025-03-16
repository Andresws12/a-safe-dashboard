import { api } from '@/src/trpc/react';
import { inferProcedureInput } from '@trpc/server';

import { AppRouter } from '~/server/api/root';
import { addPostSchema } from '~/server/schemas/postSchemas';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useSession } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type PostFormData = z.infer<typeof addPostSchema>;

export const usePost = () => {
  const utils = api.useUtils();
  const { data: session } = useSession();

  // Fetch posts
  const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
    api.post.list.useInfiniteQuery(
      { limit: 5 },
      { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

  // Add post mutation
  const { mutateAsync, isPending, error } = api.post.add.useMutation({
    onSuccess: async () => {
      await utils.post.list.invalidate();
    },
  });

  // Form handling
  const methods = useForm<PostFormData>({
    resolver: zodResolver(addPostSchema),
  });

  const onSubmit: SubmitHandler<PostFormData> = async (formData) => {
    type Input = inferProcedureInput<AppRouter['post']['add']>;
    const input: Input = {
      ...formData,
      date: new Date().toISOString(),
      author: session?.user?.email ?? '',
    };

    try {
      await mutateAsync(input);
      methods.reset();
    } catch (err) {
      console.error('Failed to add post', err);
    }
  };

  return {
    // Post list data
    postList: {
      data,
      status,
      hasNextPage: hasNextPage ?? false,
      isFetchingNextPage: isFetchingNextPage ?? false,
      fetchNextPage,
    },
    // Post creation
    postCreation: {
      methods,
      onSubmit,
      isPending,
      error,
    },
  };
};

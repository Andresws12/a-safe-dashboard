'use client';
import { CreatePostCard } from '@/components/pages/post/createNewPost';
import { PostList } from '@/components/pages/post/postList';
import { usePost } from '~/hooks/usePost';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/UI/atoms/button';
import { signOut } from 'next-auth/react';

export default function Page() {
  const t = useTranslations('Index');
  const {
    postList: { data, status, hasNextPage, isFetchingNextPage, fetchNextPage },
    postCreation: { methods, onSubmit, isPending, error },
  } = usePost();
  return (
    <div className="flex flex-col py-8">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <PostList
          data={data?.pages}
          status={status}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />

          <CreatePostCard
            methods={methods}
            onSubmit={onSubmit}
            isPending={isPending}
            error={error}
          />
          <Button onClick={() => signOut()} type="button">
          Logout
        </Button>
      </div>
    </div>
  );
}

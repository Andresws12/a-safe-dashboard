'use client';

import { useTranslations } from 'next-intl';

import { PostList } from '@/components/pages/post/postList';
import { usePost } from '~/hooks/usePost';

export default function Page() {
  const t = useTranslations('Posts');
  const {
    postList: { data, status, hasNextPage, isFetchingNextPage, fetchNextPage },
  } = usePost(5);
  return (
    <section className="space-y-6 py-8 md:py-6 lg:py-12 p-4">
      <h1 className="text-4xl font-bold m-6">{t('list.titlePage')}</h1>
      <PostList
        data={data?.pages}
        status={status}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
}

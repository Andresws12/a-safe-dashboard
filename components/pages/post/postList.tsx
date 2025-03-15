'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import { Button } from '@/components/UI/atoms/button';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '~/server/api/root';
import { useTranslations } from 'next-intl';

interface PostListProps {
  data: inferProcedureOutput<AppRouter['post']['list']>[] | undefined;
  status: 'pending' | 'error' | 'success';
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const PostList: React.FC<PostListProps> = ({
  data,
  status,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const t = useTranslations('Posts');

  return (
    <div className="flex flex-col items-start gap-y-2">
      <div className="flex gap-1">
        <h2 className="text-3xl font-semibold">
          {t('list.title')} {status === 'pending' && '(loading)'}
        </h2>
        <Button
          onClick={() => fetchNextPage()}
          type="button"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? t('list.loading')
            : hasNextPage
              ? t('list.viewMore')
              : t('list.noPosts')}
        </Button>
      </div>

      {data?.map((page, index) => (
        <Fragment key={page.items[0]?.id ?? index}>
          {page.items.map((post) => (
            <article key={post.id}>
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p>{post.text}</p>
            </article>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

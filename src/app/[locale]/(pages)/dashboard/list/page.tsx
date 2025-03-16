'use client';

import { useTranslations } from 'next-intl';

import { PostList } from '@/components/pages/post/postList';
import { Skeleton } from '@/components/UI/atoms/skeleton';
import ContentLayout from '@/components/UI/layout/ContentLayout';
import { ListLayout } from '@/components/UI/layout/ListLayout';
import { Card, CardContent, CardHeader } from '@/components/UI/molecules/card';
import { usePost } from '~/hooks/usePost';

export default function Page() {
  const t = useTranslations('Posts');
  const {
    postList: { data, status, hasNextPage, isFetchingNextPage, fetchNextPage },
  } = usePost(5);

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <Card key={`skeleton-${index}`} className="flex flex-col h-full">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="flex-grow">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ));
  };

  if (status === 'pending') {
    return (
      <ContentLayout className="space-y-4" title={t('list.titlePage')}>
        <ListLayout>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {renderSkeletons()}
          </div>
        </ListLayout>
      </ContentLayout>
    );
  }

  if (status === 'error') {
    return <div className="text-red-500">Error loading data</div>;
  }

  if (!data || data.pages.length === 0) {
    return <div className="text-gray-500">No data available</div>;
  }

  return (
    <ContentLayout title={t('list.titlePage')}>
      <PostList
        data={data.pages}
        status={status}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </ContentLayout>
  );
}

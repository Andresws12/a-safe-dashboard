'use client';
import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/UI/atoms/skeleton';
import ContentLayout from '@/components/UI/layout/ContentLayout';
import CommonChart from '@/components/UI/organisms/common-pie-chart';
import { getCategoryDistribution } from '@/handlers/common/handleCommonChart';
import { usePost } from '~/hooks/usePost';

export default function OverviewPage() {
  const t = useTranslations('Overview');
  const {
    postList: { data, status },
  } = usePost(undefined);

  if (status === 'pending') {
    return (
      <ContentLayout className="space-y-4" title={t('titlePage')}>
        <Skeleton className="h-[300px] w-full" />
      </ContentLayout>
    );
  }

  if (status === 'error') {
    return <div className="text-red-500">Error loading data</div>;
  }

  if (!data || data.pages.length === 0) {
    return <div className="text-gray-500">No data available</div>;
  }

  const count = data.pages.reduce(
    (total, page) => total + page.items.length,
    0,
  );

  const categoryData = getCategoryDistribution(data.pages);

  return (
    <ContentLayout title={t('titlePage')}>
      <CommonChart title="Categories" data={categoryData} count={count} />
    </ContentLayout>
  );
}

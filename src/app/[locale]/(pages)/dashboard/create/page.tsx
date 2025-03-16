'use client';
import { useTranslations } from 'next-intl';

import { CreatePostCard } from '@/components/pages/post/createNewPost';
import ContentLayout from '@/components/UI/layout/ContentLayout';
import { usePost } from '~/hooks/usePost';

export default function Page() {
  const t = useTranslations('Posts');
  const {
    postCreation: { methods, onSubmit, isPending, error },
  } = usePost(undefined);
  return (
    <ContentLayout title={t('create.titlePage')}>
      <CreatePostCard
        methods={methods}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error}
      />
    </ContentLayout>
  );
}

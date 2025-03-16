'use client';
import { CreatePostCard } from '@/components/pages/post/createNewPost';

import { usePost } from '~/hooks/usePost';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Posts');
  const {
    postCreation: { methods, onSubmit, isPending, error },
  } = usePost();
  return (
    <section className="space-y-6 py-8 md:py-6 lg:py-12 p-4">
      <h1 className="text-4xl font-bold m-6">{t('create.titlePage')}</h1>
      <CreatePostCard
        methods={methods}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error}
      />
    </section>
  );
}

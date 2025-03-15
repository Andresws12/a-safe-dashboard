'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/UI/atoms/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/UI/molecules/card';
import FormField from '@/components/UI/molecules/formField';
import { addPostSchema } from '~/server/schemas/postSchemas';
import * as z from 'zod';
import { useTranslations } from 'next-intl';

type PostFormData = z.infer<typeof addPostSchema>;

interface CreatePostCardProps {
  methods: ReturnType<typeof useForm<PostFormData>>;
  onSubmit: SubmitHandler<PostFormData>;
  isPending: boolean;
  error: { message: string } | null;
}

export const CreatePostCard: React.FC<CreatePostCardProps> = ({
  methods,
  onSubmit,
  isPending,
  error,
}) => {
  const t = useTranslations('Posts');
  const { register, formState: { errors } } = methods;

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-semibold">{t('create.titlePage')}</h3>
      </CardHeader>
      <CardContent>
        <form className="py-2" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4 font-semibold">
            <FormField
              id="title"
              label={t('create.title')}
              type="text"
              disabled={isPending}
              error={errors.title?.message}
              {...register('title')}
            />
            <FormField
              id="test"
              label={t('create.test')}
              type="text"
              disabled={isPending}
              error={errors.test?.message}
              {...register('test')}
            />
            <FormField
              id="text"
              label={t('create.text')}
              type="textarea"
              disabled={isPending}
              error={errors.text?.message}
              {...register('text')}
            />

            <div className="flex justify-center">
              <Button type="submit" disabled={isPending}>
                {t('create.submit')}
              </Button>
              {error && <p style={{ color: 'red' }}>{error.message}</p>}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

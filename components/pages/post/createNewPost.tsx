import { Clock, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/UI/atoms/button';
import { Label } from '@/components/UI/atoms/label';
import { Card, CardContent, CardFooter } from '@/components/UI/molecules/card';
import FormField from '@/components/UI/molecules/formField';
import { addPostSchema } from '~/server/schemas/postSchemas';

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
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  const handleSelectChange = (field: keyof PostFormData, value: string) => {
    setValue(field, value);
  };

  return (
    <div className="container max-w-4xl">
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 py-6">
            <FormField
              id="title"
              label={`${t('create.title')} *`}
              placeholder={t('create.titlePlaceholder')}
              disabled={isPending}
              error={errors.title?.message as string}
              {...register('title')}
            />

            <FormField
              id="Description"
              label={`${t('create.description')} *`}
              placeholder={t('create.descriptionPlaceholder')}
              disabled={isPending}
              type="textarea"
              rows={5}
              error={errors.description?.message as string}
              {...register('description')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="category"
                label={`${t('create.category')} *`}
                placeholder={t('create.categoryPlaceholder')}
                disabled={isPending}
                type="select"
                value={watch('category')}
                error={errors.category?.message as string}
                options={[
                  { value: 'TUTORIAL', label: t('categories.tutorial') },
                  { value: 'REVIEW', label: t('categories.review') },
                  { value: 'NEWS', label: t('categories.news') },
                  { value: 'OTHER', label: t('categories.other') },
                ]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectChange('category', e.target.value)
                }
              />

              <div className="space-y-2">
                <Label htmlFor="readTime">{t('create.readTime')}</Label>
                <div className="relative">
                  <FormField
                    id="readTime"
                    label=""
                    placeholder="5"
                    disabled={isPending}
                    className="pl-8"
                    error={errors.readTime?.message as string}
                    {...register('readTime')}
                  />
                  <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <span className="absolute right-3 top-2.5 text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>{t('create.saving')}</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {t('create.submit')}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {error && (
        <p className="text-center mt-4 text-destructive">{error.message}</p>
      )}
    </div>
  );
};

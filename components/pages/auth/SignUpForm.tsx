'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/UI/atoms/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/UI/molecules/card';
import FormField from '@/components/UI/molecules/formField';
import { api } from '@/src/trpc/react';
import { signUpSchema, ISignUp } from '~/server/schemas/authSchemas';

export const SignUpForm = () => {
  const form = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();
  const t = useTranslations('Auth');
  const signUp = api.auth.signUp.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ISignUp) => {
    const res = await signUp.mutateAsync(data);
    if (res.status === 201) {
      router.push('/');
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold ">{t('signUp.title')}</h1>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            id="username"
            label={t('signUp.username')}
            placeholder={t('signUp.username')}
            type="input"
            {...register('username')}
            error={errors.username?.message}
          />
          <FormField
            id="email"
            label={t('signUp.email')}
            placeholder={t('signUp.email')}
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <FormField
            id="password"
            label={t('signUp.password')}
            placeholder={t('signUp.password')}
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button className="w-full" type="submit">
            {t('signUp.submit')}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-center">
        {t('signUp.signInDescription')}{' '}
        <Button className="font-medium hover:underline" variant="link">
          <Link href="/">{t('signUp.signIn')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

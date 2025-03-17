'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ISignUp) => {
    setIsLoading(true);
    try {
      const res = await signUp.mutateAsync(data);
      if (res.status === 201) {
        router.push('/');
      } else {
        setError(t('signUp.error'));
      }
    } catch {
      setError(t('signUp.error'));
    } finally {
      setIsLoading(false);
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
            dataCy="sign-up-username"
            {...register('username')}
            error={errors.username?.message}
          />
          <FormField
            id="email"
            label={t('signUp.email')}
            placeholder={t('signUp.email')}
            type="email"
            dataCy="sign-up-email"
            {...register('email')}
            error={errors.email?.message}
          />
          <FormField
            id="password"
            label={t('signUp.password')}
            placeholder={t('signUp.password')}
            type="password"
            dataCy="sign-up-password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={isLoading}
            data-cy="sign-up-submit"
          >
            {isLoading ? t('signUp.loading') : t('signUp.submit')}
          </Button>
          {error && (
            <div className="text-red-500" data-cy="sign-up-error-api">
              {error}
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="text-center">
        {t('signUp.signInDescription')}{' '}
        <Button
          className="font-medium hover:underline"
          variant="link"
          data-cy="sign-up-login-button"
        >
          <Link href="/">{t('signUp.signIn')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

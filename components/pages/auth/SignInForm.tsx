'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
import { loginSchema, ILogin } from '~/server/schemas/authSchemas';

export const SigInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const t = useTranslations('Auth');
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ILogin) => {
    setIsLoading(true);
    try {
      const signInResponse = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResponse?.ok) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold ">{t('login.title')}</h1>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            id="email"
            label={t('login.email')}
            placeholder={t('login.email')}
            type="input"
            error={errors.email?.message}
            {...register('email')}
          />
          <FormField
            id="password"
            label={t('login.password')}
            placeholder={t('login.password')}
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? t('login.loading') : t('login.submit')}
          </Button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </CardContent>

      <CardFooter className="text-center justify-center">
        {t('login.signUpDescription')}{' '}
        <Button variant="link" className="font-medium hover:underline">
          <Link href="/sign-up">{t('login.signUp')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

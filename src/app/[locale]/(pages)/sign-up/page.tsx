import { SignUpForm } from '@/components/pages/auth/SignUpForm';
import { AuthLayout } from '@/components/UI/layout/AuthLayout';

export default function Page() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}

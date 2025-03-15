import { SigInForm } from '@/components/pages/auth/SignInForm';
import { AuthLayout } from '@/components/UI/layout/AuthLayout';
export default function Page() {
  return (
    <AuthLayout>
      <SigInForm />
    </AuthLayout>
  );
}

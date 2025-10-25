import { SignInForm } from '@/features/auth/components/sign-in-form';
import { requireUnauth } from '@/lib/auth-utils';

export default async function Page() {
  await requireUnauth();

  return (
    <>
      <SignInForm />
    </>
  );
}

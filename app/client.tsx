'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Client() {
  const { data } = authClient.useSession();

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
      <Button
        type="button"
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/sign-in');
              },
              onError: (ctx) => {
                toast.error(ctx.error.message);
                console.error(ctx.error);
              },
            },
          });
        }}
        variant="destructive"
        size="lg"
      >
        Logout
      </Button>

      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}

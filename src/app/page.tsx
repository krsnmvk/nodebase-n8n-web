'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Home() {
  const { data } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col  items-center justify-center">
      <Button
        type="button"
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/login');
              },
              onError: (ctx) => {
                toast.error(ctx.error.message);
              },
            },
          })
        }
      >
        Logout
      </Button>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}

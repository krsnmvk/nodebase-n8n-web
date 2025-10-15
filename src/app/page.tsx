'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Home() {
  const router = useRouter();
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const { mutate, isPending } = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );

  const testAI = useMutation(trpc.testAI.mutationOptions());

  return (
    <div className="h-screen flex flex-col  items-center gap-3 justify-center">
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
      <Button
        type="button"
        onClick={() => testAI.mutate()}
        disabled={testAI.isPending}
      >
        Test AI
      </Button>
      <Button type="button" disabled={isPending} onClick={() => mutate()}>
        Create Workflow
      </Button>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}

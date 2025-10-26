'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Client() {
  const { isPending } = authClient.useSession();

  const router = useRouter();

  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const getWorkflows = useQuery(trpc.getWorkflows.queryOptions());
  const createWorkflows = useMutation(
    trpc.createWorkflows.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );
  const testAI = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success('AI Job Queued');
      },
    })
  );

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
        disabled={isPending}
        variant="destructive"
        size="lg"
      >
        Logout
      </Button>

      <Button
        type="button"
        onClick={() => createWorkflows.mutate()}
        disabled={createWorkflows.isPending}
        variant="default"
        size="lg"
      >
        Create Workflows
      </Button>

      <Button
        type="button"
        onClick={() => testAI.mutate()}
        disabled={testAI.isPending}
        variant="default"
        size="lg"
      >
        Test AI
      </Button>

      <div>{JSON.stringify(getWorkflows.data, null, 2)}</div>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Page() {
  const trpc = useTRPC();
  const subscription = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success('Success');
      },
      onError: (ctx) => {
        toast.error(ctx.message);
      },
    })
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button
        type="button"
        onClick={() => subscription.mutate()}
        disabled={subscription.isPending}
      >
        CLick to test subscription
      </Button>
    </div>
  );
}

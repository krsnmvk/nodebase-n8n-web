import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

export function useSuspenseWorkflows() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}

export function useCreateWorkflow() {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
      },
      onError: (err) => {
        console.log(err.message);
      },
    })
  );
}

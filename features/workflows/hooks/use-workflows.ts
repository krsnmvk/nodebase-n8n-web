import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useWorkflowsParams } from './use-workflows-params';

export function useSuspenseWorkflows() {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

export function useCreateWorkflow() {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (err) => {
        console.log(err.message);
      },
    })
  );
}

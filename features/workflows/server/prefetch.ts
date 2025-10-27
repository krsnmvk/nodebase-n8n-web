import { prefetch, trpc } from '@/trpc/server';
import { inferInput } from '@trpc/tanstack-react-query';

export function prefetchWorkflows(
  params: inferInput<typeof trpc.workflows.getMany>
) {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
}

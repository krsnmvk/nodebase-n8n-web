import {
  WorkflowsContainer,
  WorkflowsErrorView,
  WorkflowsList,
  WorkflowsLoadingView,
} from '@/features/workflows/components/workflows';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { workflowsParamsLoader } from '@/features/workflows/server/workflows-params-loader';
import { requireAuth } from '@/lib/auth-utils';
import { HydrateClient } from '@/trpc/server';
import type { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: Props) {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams);

  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsErrorView />}>
          <Suspense fallback={<WorkflowsLoadingView />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}

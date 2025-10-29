'use client';

import {
  EntityContainer,
  EntityEmptyView,
  EntityErrorView,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityLoadingView,
  EntityPagination,
  EntitySearch,
} from '@/components/entity-components';
import { useEntitySearch } from '@/hooks/use-entity-search';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import type { Workflow } from '@/lib/generated/prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { WorkflowIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  useCreateWorkflow,
  useRemoveWorkflow,
  useSuspenseWorkflows,
} from '../hooks/use-workflows';
import { useWorkflowsParams } from '../hooks/use-workflows-params';

export function WorkflowsList() {
  const workflows = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorkflowsEmptyView />}
    />
  );
}

export function WorkflowsHeader({ disabled }: { disabled?: boolean }) {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        newButtonLabel="New Workflow"
        onNew={() =>
          createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
              router.push(`/workflows/${data.id}`);
              toast.success(`Workflow "${data.name}" created.`);
            },
            onError: (err) => {
              handleError(err);
              toast.success(`Failed to create workflow: ${err.message}`);
            },
          })
        }
      />
    </>
  );
}

export function WorkflowsSearch() {
  const [params, setParams] = useWorkflowsParams();
  const { onSearchChange, searchValue } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      onChange={onSearchChange}
      value={searchValue}
      placeholder="Search workflows"
    />
  );
}

export function WorkflowsPagintion() {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      onPageChange={(page) => setParams({ ...params, page })}
      page={workflows.data.page}
      totalPages={workflows.data.totalPages}
      disabled={workflows.isFetching}
    />
  );
}

export function WorkflowsLoadingView() {
  return <EntityLoadingView message="Loading workflows..." />;
}

export function WorkflowsErrorView() {
  return <EntityErrorView message="Error loading workflows" />;
}

export function WorkflowsEmptyView() {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();

  function handleCreate() {
    createWorkflow.mutate(undefined, {
      onError: (err) => handleError(err),
      onSuccess: (data) => router.push(`/workflows/${data.id}`),
    });
  }

  return (
    <>
      {modal}
      <EntityEmptyView
        onNew={handleCreate}
        message="You haven't created any workflows yet. Get started by creatig your first workflow"
      />
    </>
  );
}

export function WorkflowItem({ data }: { data: Workflow }) {
  const removeWorkflow = useRemoveWorkflow();

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{' '}
          &bull; created{' '}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="flex items-center justify-center size-8">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      isRemoving={removeWorkflow.isPending}
      onRemove={() =>
        removeWorkflow.mutate(
          { id: data.id },
          { onSuccess: (w) => toast.success(`Workflow "${w.name}" removed`) }
        )
      }
    />
  );
}

export function WorkflowsContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      pagination={<WorkflowsPagintion />}
      search={<WorkflowsSearch />}
    >
      {children}
    </EntityContainer>
  );
}

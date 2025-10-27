'use client';

import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from '@/components/entity-components';
import { useEntitySearch } from '@/hooks/use-entity-search';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from '../hooks/use-workflows';
import { useWorkflowsParams } from '../hooks/use-workflows-params';

export function WorkflowsList() {
  const workflows = useSuspenseWorkflows();

  return <div>{JSON.stringify(workflows.data, null, 2)}</div>;
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

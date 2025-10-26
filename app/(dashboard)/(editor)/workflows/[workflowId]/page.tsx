import { requireAuth } from '@/lib/auth-utils';

type Props = {
  params: Promise<{ workflowId: string }>;
};

export default async function Page({ params }: Props) {
  await requireAuth();

  const { workflowId } = await params;

  return <div>Workflow ID: {workflowId}</div>;
}

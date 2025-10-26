import { requireAuth } from '@/lib/auth-utils';

type Props = {
  params: Promise<{ credentialId: string }>;
};

export default async function Page({ params }: Props) {
  await requireAuth();

  const { credentialId } = await params;

  return <div>Credential ID: {credentialId}</div>;
}

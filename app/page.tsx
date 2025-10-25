import { requireAuth } from '@/lib/auth-utils';
import Client from './client';

export default async function Home() {
  await requireAuth();

  return <Client />;
}

import { requireAuth } from '@/lib/auth-utils';
import Client from './client';
import { Suspense } from 'react';

export default async function Home() {
  await requireAuth();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Client />
    </Suspense>
  );
}

import { Button } from '@/components/ui/button';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import Client from './client';

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="min-h-screen w-screen flex flex-col gap-4 items-center justify-center">
          <div>Home Page</div>
          <Button type="button" variant="default" size="lg">
            Click Me
          </Button>
          <Client />
        </div>
      </Suspense>
    </HydrationBoundary>
  );
}

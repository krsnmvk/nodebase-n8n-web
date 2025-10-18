import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';

export function useSubcription() {
  return useQuery({
    queryKey: ['subcription'],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
}

export function useHasActiveSubscription() {
  const { data: customerState, isPending, ...rest } = useSubcription();
  const hasActiveSubscription =
    customerState?.activeSubscriptions &&
    customerState.activeSubscriptions.length > 0;

  return {
    hasActiveSubscription,
    subcription: customerState?.activeSubscriptions?.[0],
    isPending,
    ...rest,
  };
}

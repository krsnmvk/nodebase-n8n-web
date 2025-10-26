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

export function useHasActiveSubcription() {
  const { data, isLoading, ...rest } = useSubcription();
  const hasActiveSubcription = data?.activeSubscriptions && data?.activeSubscriptions.length > 0;

  return {
    hasActiveSubcription,
    subcription: data?.activeSubscriptions?.[0],
    isLoading,
    ...rest,
  };
}

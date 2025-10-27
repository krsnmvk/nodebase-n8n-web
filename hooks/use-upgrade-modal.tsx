import { UpgradeModal } from '@/components/upgrade-modal';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';

export function useUpgradeModal() {
  const [open, setOpen] = useState(false);

  function handleError(err: unknown) {
    if (err instanceof TRPCClientError) {
      if (err?.data?.code === 'FORBIDDEN') {
        setOpen(true);
        return true;
      }
    }
    return false;
  }

  const modal = <UpgradeModal open={open} onOpenChange={setOpen} />;

  return {
    handleError,
    modal,
  };
}

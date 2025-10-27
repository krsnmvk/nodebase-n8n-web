import { PAGINATION } from '@/config/constants';
import { useEffect, useState } from 'react';

interface UseEntitySearchProps<
  T extends {
    page: number;
    search: string;
  }
> {
  params: T;
  setParams: (parmas: T) => void;
  debounceMs?: number;
}

export function useEntitySearch<
  T extends {
    page: number;
    search: string;
  }
>({ params, setParams, debounceMs = 500 }: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(params.search);

  useEffect(() => {
    if (localSearch === '' && params.search !== '') {
      setParams({
        ...params,
        page: PAGINATION.DEFAULT_PAGE,
        search: '',
      });
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params,
          page: PAGINATION.DEFAULT_PAGE,
          search: localSearch,
        });
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localSearch, params, setParams, debounceMs]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSearch(params.search);
  }, [params.search]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
}

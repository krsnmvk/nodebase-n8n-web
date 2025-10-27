import { cn } from '@/lib/utils';
import { PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew?: () => void; newButtonHref?: never }
  | { onNew?: never; newButtonHref?: string }
  | { onNew?: never; newButtonHref?: never }
);

export function EntityHeader({
  title,
  description,
  disabled,
  isCreating,
  newButtonHref,
  newButtonLabel,
  onNew,
}: EntityHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-md md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button
          type="button"
          onClick={onNew}
          disabled={disabled || isCreating}
          variant="default"
          size="sm"
        >
          <PlusIcon className="size-4" />
          <span>{newButtonLabel}</span>
        </Button>
      )}
      {!onNew && newButtonHref && (
        <Link
          href={newButtonHref}
          className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
          prefetch
        >
          <PlusIcon className="size-4" />
          <span>{newButtonLabel}</span>
        </Link>
      )}
    </header>
  );
}

type EntitySearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function EntitySearch({
  onChange,
  value,
  placeholder,
}: EntitySearchProps) {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-background max-w-[200px] border-border shadow-none pl-8"
      />
    </div>
  );
}

type EntityPaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  disabled?: boolean;
};

export function EntityPagination({
  onPageChange,
  page,
  totalPages,
  disabled,
}: EntityPaginationProps) {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <p className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </p>
      <div className="flex items-center gap-x-2 justify-end">
        <Button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1 || disabled}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages || totalPages === 0 || disabled}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

type EntityContainerProps = {
  children: Readonly<React.ReactNode>;
  header?: Readonly<React.ReactNode>;
  pagination?: Readonly<React.ReactNode>;
  search?: Readonly<React.ReactNode>;
};

export function EntityContainer({
  children,
  header,
  pagination,
  search,
}: EntityContainerProps) {
  return (
    <div className="px-4 md:px-10 md:py-6 h-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-8 w-full h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
}

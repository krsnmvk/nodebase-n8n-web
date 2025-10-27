import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

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
      </div>
      {pagination}
    </div>
  );
}

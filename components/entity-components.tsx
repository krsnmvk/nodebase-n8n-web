import { cn } from '@/lib/utils';
import {
  AlertTriangleIcon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty';
import { Input } from './ui/input';
import { Spinner } from './ui/spinner';

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

type StateViewProps = {
  message?: string;
};

type LoadingViewProps = {
  entity?: string;
} & StateViewProps;

export function EntityLoadingView({ message }: LoadingViewProps) {
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4">
      <Spinner className="size-6" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

export function EntityErrorView({ message }: StateViewProps) {
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

type EntityEmptyProps = {
  onNew?: () => void;
} & StateViewProps;

export function EntityEmptyView({ message, onNew }: EntityEmptyProps) {
  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No items</EmptyTitle>
        {!!message && <EmptyDescription>{message}</EmptyDescription>}
      </EmptyHeader>
      {!!onNew && (
        <EmptyContent>
          <Button type="button" onClick={onNew} variant="default" size="sm">
            Add item
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

type EntityListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => Readonly<React.ReactNode>;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: Readonly<React.ReactNode>;
  className?: string;
};

export function EntityList<T>({
  items,
  renderItem,
  className,
  emptyView,
  getKey,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

type EntityItemProps = {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  image?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
};

export function EntityItem({
  href,
  title,
  actions,
  className,
  image,
  isRemoving,
  onRemove,
  subtitle,
}: EntityItemProps) {
  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) return;

    if (onRemove) {
      await onRemove();
    }
  }

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          'p-4 shadow-none hover:shadow cursor-pointer',
          isRemoving && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex  items-center gap-3">
            {image}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subtitle && (
                <CardDescription className="text-xs">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <div className="flex items-center gap-x-4">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      variant="ghost"
                      size="icon"
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem onClick={handleRemove}>
                      <Trash2Icon className="size-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
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

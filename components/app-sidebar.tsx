'use client';

import { useHasActiveSubcription } from '@/features/subcriptions/hooks/use-subcription';
import { authClient } from '@/lib/auth-client';
import {
  CreditCardIcon,
  FolderIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const menuItems = [
  {
    title: 'Main',
    items: [
      {
        title: 'Workflows',
        icon: FolderIcon,
        url: '/workflows',
      },
      {
        title: 'Credentials',
        icon: KeyIcon,
        url: '/credentials',
      },
      {
        title: 'Executions',
        icon: HistoryIcon,
        url: '/executions',
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { hasActiveSubcription, isLoading } = useHasActiveSubcription();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="gap-x-4 px-4 h-10" asChild>
              <Link href="/" prefetch>
                <Image src="/logo.svg" alt="Nodebase" width={30} height={30} />
                <span className="font-semibold text-sm">Nodebase</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="gap-x-4 h-10 px-4"
                      isActive={item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)}
                      asChild
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubcription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={async () => await authClient.checkout({ slug: 'pro' })}
                tooltip="Upgrade to Pro"
                className="gap-x-4 px-4 h-10"
              >
                <StarIcon className="size-4" />
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => await authClient.customer.portal()}
              tooltip="Billing Portal"
              className="gap-x-4 px-4 h-10"
            >
              <CreditCardIcon className="size-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () =>
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push('/');
                    },
                  },
                })
              }
              tooltip="Logout"
              className="gap-x-4 px-4 h-10"
            >
              <LogOutIcon className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

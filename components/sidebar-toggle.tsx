'use client';

import type { ComponentProps } from 'react';
import { BetterTooltip } from '@/components/ui/tooltip';
import { RouteIcon, SidebarLeftIcon } from './icons';
import { Button } from '@/components/ui/button';
import { useRightSidebar } from './context/right-sidebar-context';
import { useSidebar } from './ui/sidebar';

export function SidebarToggle({
  className,
}: {
  className?: string;
}) {
  const { toggleSidebar: toggleLeftSidebar } = useSidebar();

  return (
    <BetterTooltip content="Toggle Sidebar" align="start">
      <Button onClick={toggleLeftSidebar} variant="outline" className={`p-3 md:h-fit ${className}`}>
        <SidebarLeftIcon size={16} />
      </Button>
    </BetterTooltip>
  );
}

export function RightSidebarToggle({
  className,
}: {
  className?: string;
}) {
  const { toggleSidebar: toggleRightSidebar } = useRightSidebar();
  
  return (
    // <BetterTooltip content="Toggle Notifications" align="start">
      <Button onClick={toggleRightSidebar} variant="outline" className={`p-3 md:h-fit ${className}`}>
        <RouteIcon size={24} />
      </Button>
    // </BetterTooltip>
  );
}
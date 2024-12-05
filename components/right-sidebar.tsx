'use client';

import { useEffect, useState } from 'react';
import { BetterTooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { SidebarLeftIcon } from './icons';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from './ui/sheet';
import { useRouter } from 'next/navigation';
import { createNewChat } from '@/app/(chat)/actions';
import { generateUUID } from '@/lib/utils';

export function RightSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Handle initialization after mount
  useEffect(() => {
    setIsMounted(true);

    // Check mobile status
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Load saved state
    const storedState = localStorage.getItem('right-sidebar:state');
    if (storedState !== null) {
      setIsOpen(storedState === 'true');
    }

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render anything until component is mounted
  if (!isMounted) {
    return null;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    localStorage.setItem('right-sidebar:state', (!isOpen).toString());
  };

  const handleRolePlayClick = async () => {
    try {
      // Create new chat
      const chatId = await createNewChat();

      // Navigate to the chat
      router.push(`/chat/${chatId}`);

      // Let's wait a moment to ensure chat is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      // Send initial role play message
      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: chatId,
          messages: [{
            id: generateUUID(),
            role: 'user',
            content: 'I want to practice about my job with a role play'
          }],
          modelId: 'gpt-4o',
          system:
            'You are a helpful writing assistant. Based on the description, please update the piece of writing.'
        })
      });

      // Close sidebar on mobile after selection
      if (isMobile) {
        setIsOpen(false);
      }

      // Reload the page to ensure chat loads properly
      window.location.reload();

    } catch (error) {
      console.error('Failed to create role play chat:', error);
    }
  };

  const sidebarContent = (
    <div className="space-y-4">
      <span className="text-lg font-semibold">Toolbox</span>

      {/* Role Play Card */}
      <div
        onClick={handleRolePlayClick}
        className="p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 
                 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2">
          <div>🎭</div>
          <h3 className="font-medium">Role Play</h3>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">
          Practice typical work situations together
        </p>
      </div>

      <div
        onClick={handleRolePlayClick}
        className="p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 
                 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2">
          <div>💭</div>
          <h3 className="font-medium">Guided Reflection Check-In</h3>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">
         Pause to reflect on work experiences through guided questions
        </p>
      </div>

      <div
        onClick={handleRolePlayClick}
        className="p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 
                 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2">
          <div>🪷</div>
          <h3 className="font-medium">Calm Down Corner</h3>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">
          Take a moment to decompress when feeling overwhelmed.
        </p>
      </div>

      <div
        onClick={handleRolePlayClick}
        className="p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 
                 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2">
          <div>🫂</div>
          <h3 className="font-medium">Reach Out to Samhall Buddies</h3>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">
          Connect with experienced peers for advice and support
        </p>
      </div>


    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed top-[10px] right-4 z-50">
          <BetterTooltip content="Toggle Right Sidebar" align="start">
            <Button
              onClick={toggleSidebar}
              variant="outline"
              className="md:px-2 md:h-fit"
            >
              <SidebarLeftIcon size={16} />
            </Button>
          </BetterTooltip>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="right"
            className="w-[85%] sm:w-[350px] p-4"
          >
            <div className="h-full bg-background">
              {sidebarContent}
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <div className="relative">
      <div className="fixed top-[10px] right-4 z-50">
        <BetterTooltip content="Toggle Right Sidebar" align="start">
          <Button
            onClick={toggleSidebar}
            variant="outline"
            className="md:px-2 md:h-fit"
          >
            <SidebarLeftIcon size={16} />
          </Button>
        </BetterTooltip>
      </div>

      <div
        className={cn(
          "fixed right-0 top-0 z-30 h-screen w-96 bg-sidebar px-5 py-3 transition-transform duration-500",
          !isOpen && "translate-x-full"
        )}
      >
        {sidebarContent}
      </div>
    </div>
  );
}
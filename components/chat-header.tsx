'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { toast } from 'sonner';

import { SidebarToggle, RightSidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';
import { createNewChat, saveLanguage } from '@/app/(chat)/actions';
import { LanguageSelector } from './language-selector';

export function ChatHeader({
  selectedModelId,
  selectedLanguage,
  onLanguageChange,
}: {
  selectedModelId: string;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}) {
  const router = useRouter();
  const { width: windowWidth } = useWindowSize();

  const handleNewChat = useCallback(async () => {
    try {
      const newChatId = await createNewChat();
      router.push(`/chat/${newChatId}`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to create new chat. Please try again.');
      console.error(error);
    }
  }, [router]);

  const handleLanguageChange = async (language: string) => {
    await saveLanguage(language);
    onLanguageChange(language);
    toast.success(`Language changed to ${language}`);
  };

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      <div className="flex items-center ml-auto gap-2">
        <LanguageSelector/>
        <RightSidebarToggle />
      </div>
    </header>
  );
}
'use client';

import { useChat } from 'ai/react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const suggestedActions = [
  {
    title: '🎯 Practice Work Scenarios',
    label: 'Let\'s practice common work situations together',
    action: 'I\'d like to practice some common work scenarios I might encounter at Samhall',
  },
  {
    title: '🏢 About Samhall',
    label: 'Learn about Samhall\'s mission and values', 
    action: 'Can you tell me about Samhall\'s mission, values, and what makes it special?',
  },
  {
    title: '📋 My Training Program',
    label: 'Understand your role and daily routines',
    action: 'Can you explain my training program, what I\'ll be doing day-to-day, and how I\'ll develop my skills?',
  },
  {
    title: '🤝 Support & Resources',
    label: 'Learn about available help and support',
    action: 'What kind of support and resources are available to me as a Samhall employee?',
  }
];

export function Sidebar() {
  const { append } = useChat();
  const params = useParams();
  const chatId = typeof params?.id === 'string' ? params.id : '';

  return (
    <div className="space-y-4 h-full">
      <span className="text-lg font-semibold">Toolbox</span>
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          key={`suggested-action-${suggestedAction.title}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          className="block"
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
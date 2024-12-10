import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const extendedSuggestedActions = [
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
    },
    // Extended actions
    {
        title: '🗣️ Communication Skills',
        label: 'Practice effective workplace communication',
        action: 'Help me improve my workplace communication skills',
    },
    {
        title: '⚡ Workplace Safety',
        label: 'Learn about safety protocols and procedures',
        action: 'What are the important safety guidelines I need to follow at Samhall?',
    },
    {
        title: '📅 Time Management',
        label: 'Tips for managing work schedules',
        action: 'Can you help me with strategies for managing my work schedule effectively?',
    },
    {
        title: '🤔 Problem Solving',
        label: 'Practice handling workplace challenges',
        action: 'Let\'s practice solving common workplace problems I might encounter',
    },
    {
        title: '🌟 Career Growth',
        label: 'Explore development opportunities',
        action: 'What career development opportunities are available at Samhall?',
    },
    {
        title: '👥 Teamwork',
        label: 'Learn about working with colleagues',
        action: 'How can I be a good team member at Samhall?',
    }
];

export function SuggestedActionsWithModal({
    chatId,
    append
}: {
    chatId: string;
    append: (message: any) => Promise<any>;
}) {
    const initialVisibleCount = 2;
    const [isOpen, setIsOpen] = useState(false);

    const ActionButton = ({ action, index }: { action: typeof extendedSuggestedActions[0], index: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.05 * index }}
        >
            <Button
                variant="ghost"
                onClick={async () => {
                    window.history.replaceState({}, '', `/chat/${chatId}`);
                    setIsOpen(false);  // Close sheet after selection
                    append({
                        role: 'user',
                        content: action.action,
                    });
                }}
                className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 flex-col w-full h-auto justify-start items-start"
            >
                <span className="font-medium">{action.title}</span>
                <span className="text-muted-foreground">
                    {action.label}
                </span>
            </Button>
        </motion.div>
    );

    return (
        <div className="grid gap-2 w-full">
            {/* Initial visible actions */}
            <div className="grid sm:grid-cols-2 gap-2">
                {extendedSuggestedActions.slice(0, initialVisibleCount).map((action, index) => (
                    <ActionButton
                        key={`initial-${action.title}`}
                        action={action}
                        index={index}
                    />
                ))}
            </div>

            {/* See More Button with Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full mt-2"
                    >
                        See More Options
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="h-[100dvh] p-0 flex flex-col" // Use dvh for better mobile support
                >
                    <SheetHeader className="px-4 py-3 border-b">
                        <SheetTitle className="text-left">More Ways I Can Help</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid sm:grid-cols-2 gap-2 p-4">
                            {extendedSuggestedActions.map((action, index) => (
                                <ActionButton
                                    key={`modal-${action.title}`}
                                    action={action}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
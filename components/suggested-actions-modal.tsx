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

// Organize actions by category
const categories = {
    "All": "all",
    "Daily Support": "daily",
    "Learning Tools": "learning",
    "Wellbeing Center": "wellbeing",
    "Samhall Info": "info",
    "Ask for Help": "help"
} as const;

const extendedSuggestedActions = [
    {
        title: '👋 Greeting Practice',
        label: 'Practice workplace greetings and introductions',
        action: 'Can we practice how to greet colleagues and introduce myself professionally?',
        category: 'learning'
    },
    {
        title: '🤝 Asking for Help',
        label: 'Learn how to politely ask for assistance',
        action: 'I\'d like to practice how to ask for help politely when I need it.',
        category: 'learning'
    },
    {
        title: '🏢 About Samhall',
        label: 'Learn about Samhall\'s mission and values',
        action: 'Can you tell me about Samhall\'s mission, values, and what makes it special?',
        category: 'info'
    },
    {
        title: '📋 My Training Program',
        label: 'Understand your role and daily routines',
        action: 'Can you explain my training program, what I\'ll be doing day-to-day, and how I\'ll develop my skills?',
        category: 'learning'
    },
    {
        title: '🤝 Support & Resources',
        label: 'Learn about available help and support',
        action: 'What kind of support and resources are available to me as a Samhall employee?',
        category: 'help'
    },
    {
        title: '🗣️ Communication Skills',
        label: 'Practice effective workplace communication',
        action: 'Help me improve my workplace communication skills',
        category: 'learning'
    },
    {
        title: '⚡ Workplace Safety',
        label: 'Learn about safety protocols and procedures',
        action: 'What are the important safety guidelines I need to follow at Samhall?',
        category: 'daily'
    },
    {
        title: '📅 Time Management',
        label: 'Tips for managing work schedules',
        action: 'Can you help me with strategies for managing my work schedule effectively?',
        category: 'daily'
    },
    {
        title: '😌 Stress Management',
        label: 'Learn techniques to stay calm and focused',
        action: 'Can you help me with ways to manage stress at work?',
        category: 'wellbeing'
    },
    {
        title: '🌟 Career Growth',
        label: 'Explore development opportunities',
        action: 'What career development opportunities are available at Samhall?',
        category: 'info'
    },
    {
        title: '👥 Teamwork',
        label: 'Learn about working with colleagues',
        action: 'How can I be a good team member at Samhall?',
        category: 'daily'
    },

    // Navigation & Facilities
    {
        title: '🗺️ Finding My Way',
        label: 'Help with finding important places at work',
        action: 'Where can I find important places like the lunchroom, quiet spaces, and restrooms?',
        category: 'daily'
    },
    {
        title: '💻 Using Work Systems',
        label: 'Learn how to use work platforms and tools',
        action: 'Can you help me understand how to use the onboarding platform and other work systems?',
        category: 'daily'
    },

    // Daily Routine
    {
        title: '⏰ Morning Schedule',
        label: 'Understanding start times and morning routine',
        action: 'What time should I arrive in the morning and what should my morning routine look like?',
        category: 'daily'
    },
    {
        title: '🎒 Daily Preparation',
        label: 'What to bring and how to prepare',
        action: 'What do I need to bring with me to work each day?',
        category: 'daily'
    },

    // Reflection Tools
    {
        title: '📝 Task Reflection',
        label: 'Review and learn from your work tasks',
        action: 'I\'d like to reflect on my tasks today - what went well and what was challenging.',
        category: 'wellbeing'
    },
    {
        title: '🌱 Progress Check-in',
        label: 'Celebrate achievements and set goals',
        action: 'Let\'s talk about what I\'ve accomplished this week and what I\'m proud of.',
        category: 'wellbeing'
    },
    {
        title: '🎯 Skill Development',
        label: 'Identify strengths and areas for practice',
        action: 'Can we discuss which tasks I handled well and what I\'d like to practice more?',
        category: 'learning'
    },

    // Social Skills Practice
    
    {
        title: '🎯 Focus Skills',
        label: 'Managing distractions and staying focused',
        action: 'Can you help me learn strategies for staying focused when there are distractions?',
        category: 'wellbeing'
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
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>('All');

    const filteredActions = extendedSuggestedActions.filter(action => 
        selectedCategory === 'All' || action.category === categories[selectedCategory]
    );

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
                        See more options
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="h-[100dvh] p-0 flex flex-col"
                >
                    <SheetHeader className="px-4 py-3 border-b">
                        <SheetTitle className="text-left">More ways Sammie can help</SheetTitle>
                        
                        {/* Category tabs */}
                        <div className="flex gap-2 overflow-x-auto py-2 px-1 -mb-3">
                            {(Object.keys(categories) as Array<keyof typeof categories>).map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className="shrink-0"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </SheetHeader>
                    
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid sm:grid-cols-2 gap-2 p-4">
                            {filteredActions.map((action, index) => (
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
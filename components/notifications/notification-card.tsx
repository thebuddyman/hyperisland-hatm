import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { type Notification } from '@/lib/data/notifications';
import { createNewChat } from '@/app/(chat)/actions';
import { useRightSidebar } from '@/components/context/right-sidebar-context';

export default function NotificationCard({ notification }: { notification: Notification }) {
    const router = useRouter();
    const { toggleSidebar } = useRightSidebar(); // Add this line

    // Local state to manage the status
    const [status, setStatus] = useState(notification.status);

    const getTypeIcon = () => {
        switch (notification.type) {
            case 'check_in':
                return '👋';
            case 'reminder':
                return '⏰';
            case 'celebration':
                return '🎉';
            case 'tip':
                return '💡';
            case 'alert':
                return '🔔';
            default:
                return '📝';
        }
    };

    const handleNotificationClick = async () => {
        try {
            // Update the notification status to read
            setStatus('read');

            // Create a new chat and navigate to it
            const chatId = await createNewChat(notification.description);

            toggleSidebar(); // Add this line

            router.push(`/chat/${chatId}`);
        } catch (error) {
            console.error('Failed to handle notification:', error);
        }
    };

    return (
        <div
            className={`p-4 mb-2 rounded-lg border cursor-pointer transition-all hover:shadow-md ${status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-zinc-800'
                }`}
            onClick={handleNotificationClick}
        >
            <div className="flex items-start gap-3">
                <div className="text-xl">{getTypeIcon()}</div>
                <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{notification.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </div>
                </div>
                {status === 'unread' && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
            </div>
        </div>
    );
}
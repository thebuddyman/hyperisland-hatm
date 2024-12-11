import { formatDistanceToNow } from 'date-fns';
import { Bell } from 'lucide-react';
import { type Notification } from '@/lib/data/notifications';

export default function NotificationCard({ notification }: { notification: Notification }) {
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

  return (
    <div className={`p-4 mb-2 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
      notification.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-zinc-800'
    }`}>
      <div className="flex items-start gap-3">
        <div className="text-xl">{getTypeIcon()}</div>
        <div className="flex-1">
          <h3 className="font-medium text-sm mb-1">{notification.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{notification.description}</p>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </div>
        </div>
        {notification.status === 'unread' && (
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        )}
      </div>
    </div>
  );
}
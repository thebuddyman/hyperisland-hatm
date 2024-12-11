export interface Notification {
    id: string;
    type: 'check_in' | 'reminder' | 'celebration' | 'tip' | 'alert';
    title: string;
    description: string;
    timestamp: string;
    status: 'read' | 'unread';
    priority: 'low' | 'normal' | 'high';
  }
  
  export const notifications: Notification[] = [
    {
      id: '1',
      type: 'check_in',
      title: 'Daily Check-In',
      description: "How are you feeling today? Let's have a quick chat!",
      timestamp: '2024-03-20T09:00:00Z',
      status: 'unread',
      priority: 'normal'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Weekly Goal Review',
      description: 'Time to review your progress on this week\'s goals.',
      timestamp: '2024-03-19T15:30:00Z',
      status: 'unread',
      priority: 'high'
    },
    {
      id: '3',
      type: 'celebration',
      title: 'First Week Complete! 🎉',
      description: 'Congratulations on completing your first week!',
      timestamp: '2024-03-19T12:00:00Z',
      status: 'read',
      priority: 'normal'
    },
    {
      id: '4',
      type: 'tip',
      title: 'Workplace Tip',
      description: 'Did you know you can request a buddy for support?',
      timestamp: '2024-03-19T10:15:00Z',
      status: 'read',
      priority: 'low'
    },
    {
      id: '5',
      type: 'alert',
      title: 'New Training Available',
      description: 'Check out the new safety training module.',
      timestamp: '2024-03-19T08:30:00Z',
      status: 'unread',
      priority: 'high'
    }
  ];
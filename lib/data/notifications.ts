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
      title: 'Manager Meeting Follow-up',
      description: "How was your first meeting with your manager? I'd love to hear about your experience.",
      timestamp: '2024-12-09T09:00:00Z',
      status: 'unread',
      priority: 'normal'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Morning Wellness Check',
      description: 'Take a deep breath and check in with your feelings before you start your day. How are you feeling?',
      timestamp: '2024-12-10T08:00:00Z',
      status: 'unread',
      priority: 'normal'
    }
  ];
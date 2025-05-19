export interface NavbarProps {
  toggleSidebar?: () => void;
}

export interface NotificationProps {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const notifications: NotificationProps[] = [
  {
    id: '1',
    title: 'New Order',
    message: 'You have received a new order #12345',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'Payment Success',
    message: 'Payment for order #12344 was successful',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '3',
    title: 'New Message',
    message: 'You have a new message from John Doe',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    title: 'New Order',
    message: 'You have received a new order #12343',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    title: 'Payment Success',
    message: 'Payment for order #12342 was successful',
    time: 'Yesterday',
    read: true,
  },
];

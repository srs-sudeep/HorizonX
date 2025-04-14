// This is a placeholder since the actual file wasn't in the retrieval results
// I'll create a basic structure based on what we can see in the Sidebar component

export const menuConfig = [
  {
    path: '/:role',
    label: 'Dashboard',
    icon: 'dashboard',
    roles: ['admin', 'manager', 'user'],
    dynamicPath: true, // Add this flag to indicate it's a dynamic path
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: 'analytics',
    roles: ['admin', 'manager'],
  },
  {
    path: '/crm',
    label: 'CRM',
    icon: 'crm',
    roles: ['admin', 'manager'],
    children: [
      {
        path: '/crm/customers',
        label: 'Customers',
        icon: 'people',
      },
      {
        path: '/crm/leads',
        label: 'Leads',
        icon: 'person',
      },
    ],
  },
  {
    path: '/ecommerce',
    label: 'E-Commerce',
    icon: 'store',
    roles: ['admin', 'manager'],
    children: [
      {
        path: '/ecommerce/products',
        label: 'Products',
        icon: 'cart',
      },
      {
        path: '/ecommerce/orders',
        label: 'Orders',
        icon: 'chart',
      },
    ],
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: 'settings',
    roles: ['admin', 'manager', 'user'],
  },
];

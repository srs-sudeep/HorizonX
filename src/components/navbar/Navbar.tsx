import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import UserAvatar from '@/components/UserAvatar';
import { getDashboardLink } from '@/lib/redirect';
import { useAuthStore, type UserRole } from '@/store';
import { ThemeSwitcher } from '@/theme';
import { Bell, ChevronDown, HelpCircle, LogOut, Mail, Search, Settings, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar?: () => void;
}

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: NotificationProps[] = [
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
];


const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { user, logout, setCurrentRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    navigate(getDashboardLink(role));
  };

  // Get current page name from path
  const getPageName = () => {
    const path = location.pathname.split('/');
    return path[path.length - 1].charAt(0).toUpperCase() + path[path.length - 1].slice(1);
  };

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1);
      return { name, url };
    });
  };

  return (

 <header className='sticky top-2 border mx-2 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/20 p-2 backdrop-blur-xl dark:bg-[#0b14374d]'>
      <div className="flex items-center justify-between w-full">
        {/* Left side with breadcrumbs and page title */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <Breadcrumb className="text-sm text-muted-foreground flex">
              <BreadcrumbItem className="flex items-center">
                <BreadcrumbLink href="/" className="hover:text-primary">HorizonX</BreadcrumbLink>
              </BreadcrumbItem>
              {getBreadcrumbItems().map((item, index) => (
                <BreadcrumbItem key={index} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbLink href={item.url} className="hover:text-primary">{item.name}</BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </div>
          <h1 className="text-2xl font-semibold mt-1 text-foreground">{getPageName()}</h1>
        </div>

        {/* Center - Search */}
        <div className="relative max-w-md">
          <div className="relative w-full">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-background/50 border-none focus-visible:ring-1 focus-visible:ring-primary/30"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-xs flex items-center justify-center text-white">
                  {notifications.filter(n => !n.read).length}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 rounded-xl shadow-lg" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm" className="text-xs text-blue-500">
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-0 ${notification.read ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <span className="text-xs text-muted-foreground mt-2 block">
                          {notification.time}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t text-center">
                <Button variant="ghost" size="sm" className="text-sm text-blue-500 w-full">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative p-0 flex items-center gap-2 h-9 rounded-full pr-2 hover:bg-background/5"
              >
                <UserAvatar
                  name={user?.name || 'User'}
                  role={user?.currentRole || ''}
                  showInfo={false}
                />
                <span className="hidden md:inline-block font-medium">{user?.name}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl" align="end">
              <div className="flex items-center p-2 border-b">
                <UserAvatar
                  name={user?.name || 'User'}
                  role={user?.currentRole || ''}
                  showInfo={true}
                />
              </div>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {user?.roles && user.roles.length > 1 && (
                <>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <User className="mr-2 h-4 w-4" />
                      <span>Switch Role</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="rounded-xl">
                        {user.roles.map(role => (
                          <DropdownMenuItem
                            key={role}
                            onClick={() => handleRoleChange(role)}
                            className={
                              role === user.currentRole ? 'bg-primary/10 text-primary' : ''
                            }
                          >
                            <span className="capitalize">{role}</span>
                            {role === user.currentRole && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></span>
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
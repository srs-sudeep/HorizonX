import AppLogo from '@/components/AppLogo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
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
import { useSidebar } from '@/core/context/sidebarContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuthStore, type UserRole } from '@/store';
import { ThemeSwitcher } from '@/theme';
import { notifications } from '@/types';
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { user, logout, setCurrentRole } = useAuthStore();
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  const [isChangingRole, setIsChangingRole] = useState(false);

  const handleRoleChange = async (role: UserRole) => {
    if (user?.currentRole === role) return; // Skip if already on this role

    try {
      setIsChangingRole(true);

      // Call setCurrentRole from auth store which handles the API call
      await setCurrentRole(role);
    } catch (error) {
      console.error('Failed to change role:', error);
      toast({
        title: 'Role Change Failed',
        description: 'Unable to switch roles. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsChangingRole(false);
    }
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
  if (isMobile) {
    return (
      <div className="sticky top-0 z-40 h-14 flex items-center justify-between px-4 border-b rounded-b-xl shadow-2x py-3 bg-[#0b14374d]/5 dark:bg-white/8 backdrop-blur-theme">
        <div className="md:hidden mr-2">
          <button onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="text-sm font-semibold text-muted-foreground">
          <AppLogo horizontal />
        </div>
        <div className="flex flex-row">
          <div>
            <ThemeSwitcher />
          </div>
          <Drawer direction="bottom">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserAvatar
                  name={user?.name || 'User'}
                  role={user?.currentRole || ''}
                  showInfo={false}
                />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 space-y-4 w-[100vw] rounded-t-3xl">
              <DrawerHeader>
                <DrawerTitle className="text-lg">Quick Menu</DrawerTitle>
              </DrawerHeader>

              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg border" />
                </div>

                {/* Notifications */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </div>
                  <div className="max-h-48 overflow-y-auto border rounded-md">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`px-4 py-2 text-sm border-b last:border-0 ${n.read ? 'opacity-60' : ''}`}
                      >
                        <div className="font-semibold">{n.title}</div>
                        <p className="text-xs">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role Switch */}
                {user?.roles && user.roles.length > 1 && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">Switch Role</p>
                    <div className="space-y-1">
                      {user.roles.map(role => (
                        <Button
                          key={role}
                          variant={role === user.currentRole ? 'default' : 'outline'}
                          size="sm"
                          className="w-full capitalize"
                          onClick={() => handleRoleChange(role)}
                          disabled={isChangingRole}
                        >
                          {role === user.currentRole && isChangingRole ? (
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : null}
                          {role}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-1 text-sm">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" /> Help & Support
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full justify-start"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    );
  }

  return (
    <div className="isolate sticky top-2 border mx-6 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl shadow-2x py-3 px-6  bg-[#0b14374d]/5 dark:bg-white/8 backdrop-blur-theme">
      <div className="flex items-center justify-between w-full">
        {/* Left side with breadcrumbs and page title */}
        <div className="flex flex-col justify-center">
          <Breadcrumb className="flex flex-wrap items-center space-x-1 text-base font-medium text-muted-foreground">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-primary">
                  HorizonX
                </BreadcrumbLink>
              </BreadcrumbItem>

              {getBreadcrumbItems().map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.url} className="hover:text-primary">
                      {item.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold text-foreground">{getPageName()}</h1>
        </div>

        {/* Center - Search */}
        <div className="flex-1 px-8">
          <div className="relative max-w-xl mx-auto w-full">
            <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-full bg-background/90 border border-border/50 focus-visible:ring-1 focus-visible:ring-primary/40 shadow-sm"
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
                            disabled={isChangingRole}
                          >
                            {role === user.currentRole && isChangingRole ? (
                              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            ) : null}
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
    </div>
  );
};

export default Navbar;

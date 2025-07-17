import {
  AppLogo,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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
  LoadingFallback,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SearchPanel,
  SettingsSidebar,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  UserAvatar,
  useToast,
} from '@/components';
import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import bellAnimation from '@/assets/animations/bell.json';
import menuAnimation from '@/assets/animations/menu.json';
import settingsAnimation from '@/assets/animations/settings.json';
import searchAnimation from '@/assets/animations/searchToX.json';
import { useSidebar } from '@/core';
import { useIsMobile } from '@/hooks';
import { getDashboardLink } from '@/lib/redirect';
import { useAuthStore, useTypographyStore, FONT_FAMILIES } from '@/store';

import { notifications, UserRole } from '@/types';
import { ChevronDown, HelpCircle, LogOut, User, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// Bell Lottie
const BellLottie = () => {
  const lottieRef = useRef();
  return (
    <div
      onClick={() => lottieRef.current?.play()}
      style={{ cursor: 'pointer' }}
      className="text-gray-800 dark:text-white"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={bellAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 20, height: 20 }}
        onComplete={() => lottieRef.current?.goToAndStop(0, true)}
      />
    </div>
  );
};
// Menu Lottie
const MenuLottie = () => {
  const lottieRef = useRef();
  return (
    <div onClick={() => lottieRef.current?.play()} style={{ cursor: 'pointer' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={menuAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 24, height: 24 }}
        onComplete={() => lottieRef.current?.goToAndStop(0, true)}
      />
    </div>
  );
};
// Settings Lottie
const SettingsLottie = () => {
  const lottieRef = useRef();
  return (
    <div onClick={() => lottieRef.current?.play()} style={{ cursor: 'pointer' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={settingsAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 20, height: 20 }}
        onComplete={() => lottieRef.current?.goToAndStop(0, true)}
      />
    </div>
  );
};
// Search Lottie
const SearchLottie = () => {
  const lottieRef = useRef();
  return (
    <div onClick={() => lottieRef.current?.play()} style={{ cursor: 'pointer' }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={searchAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 20, height: 20 }}
        onComplete={() => lottieRef.current?.goToAndStop(0, true)}
      />
    </div>
  );
};

export const Navbar = () => {
  const { user, logout, setCurrentRole, currentRole } = useAuthStore();
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { fontFamily, fontSize } = useTypographyStore();
  const selectedFont = FONT_FAMILIES.find(font => font.value === fontFamily)?.class || 'font-inter';
  const fontSizeClass = `text-${fontSize}`;
  const fontClass = `${selectedFont} ${fontSizeClass}`;
  // Handle keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleChange = async (role: UserRole) => {
    if (currentRole === role) return;
    try {
      setIsChangingRole(true);
      setShowLoader(true);
      setCurrentRole(role);
      navigate(getDashboardLink(role));
      toast({
        title: 'Role Change Successful',
        description: `Switched to ${role} role successfully.`,
        variant: 'default',
      });
    } catch (error) {
      console.error('Failed to change role:', error);
      toast({
        title: 'Role Change Failed',
        description: 'Unable to switch roles. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => {
        setIsChangingRole(false);
        setShowLoader(false);
      }, 800);
    }
  };

  // Get current page name from path
  const getPageName = () => {
    const path = location.pathname.split('/');
    return path[2]?.charAt(0).toUpperCase() + path[2]?.slice(1);
  };

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
      <div className={`${selectedFont} ${fontSizeClass}`}>
        <div className="sticky top-0 z-40 h-14 flex items-center justify-between px-4 border-b rounded-b-xl shadow-2xl py-3 bg-card" data-component="navbar">
        <div className="md:hidden mr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={toggleSidebar}>
                <MenuLottie />
              </button>
            </TooltipTrigger>
            <TooltipContent>Toggle Sidebar</TooltipContent>
          </Tooltip>
        </div>
        <div className="text-sm font-semibold text-muted-foreground">
          <AppLogo horizontal imgClassname="w-[80vw] h-[7vh]" />
        </div>
        <div className="flex flex-row">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <SearchLottie />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Search</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <SettingsSidebar />
            </TooltipTrigger>
            <TooltipContent side="bottom">Settings</TooltipContent>
          </Tooltip>
          <Drawer direction="bottom">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserAvatar name={user?.name || 'User'} role={currentRole || ''} showInfo={false} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 space-y-4 w-[100vw] rounded-t-3xl">
              <DrawerHeader>
                <DrawerTitle className="text-lg">Quick Menu</DrawerTitle>
              </DrawerHeader>

              <div className="space-y-4">
                {/* Notifications */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
                    <BellLottie />
                    Notifications
                  </div>
                  <div className="max-h-48 overflow-y-auto border rounded-md" >
                    {notifications.map(n => (
                      <div
                      data-component="notification-card"
                        key={n.id}
                        className={`px-4 py-2 text-sm border-b last:border-0 ${n.read ? 'opacity-60' : ''}`}
                      >
                        <div className={`font-semibold ${selectedFont}`}>{n.title}</div>
                        <p className={`text-xs ${selectedFont}`}>{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role Switch */}
                {user?.roles && user.roles.length > 1 && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm font-medium">Switch Role</p>
                    <div className="max-h-48 overflow-y-auto border rounded-md space-y-2">
                      {user.roles.map(role => (
                        <Button
                          key={role}
                          variant={role === currentRole ? 'default' : 'outline'}
                          size="sm"
                          className="w-full capitalize"
                          onClick={() => handleRoleChange(role)}
                          disabled={isChangingRole}
                        >
                          {role === currentRole && isChangingRole ? (
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard/profile')}
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/support')}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" /> Help & Support
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate('/about')}
                  >
                    <Info className="mr-2 h-4 w-4 text-foreground" /> About Us
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      
      {/* Search Panel */}
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
  }

  return (
    <div className={`${selectedFont} ${fontSizeClass}`}>
      {/* Full Page Loader */}
      {showLoader && <LoadingFallback />}

      <div className="isolate sticky top-2 mx-6 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-card/50 shadow-lg py-3 h-24 px-6 backdrop-blur-sm border dark:border-border" data-component="navbar">
        <div className="flex items-center justify-between w-full">
          {/* Left side with breadcrumbs and page title */}
          <div className="flex flex-col justify-center">
            <Breadcrumb
              className="flex flex-nowrap items-center space-x-1 text-base font-medium text-muted overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20"
              style={{ maxWidth: '100vw' }}
            >
              <BreadcrumbList className="flex flex-row items-center flex-nowrap">
                <BreadcrumbItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <BreadcrumbLink href="/" className="hover:text-primary">
                        HorizonX
                      </BreadcrumbLink>
                    </TooltipTrigger>
                    <TooltipContent>HorizonX</TooltipContent>
                  </Tooltip>
                </BreadcrumbItem>

                {getBreadcrumbItems().slice(1).map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BreadcrumbLink href={item.url} className="hover:text-primary">
                            {item.name}
                          </BreadcrumbLink>
                        </TooltipTrigger>
                        <TooltipContent>{item.name}</TooltipContent>
                      </Tooltip>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="xl:text-3xl text-lg md:text-2xl font-bold text-foreground truncate">
              {getPageName()}
            </h1>
          </div>
          {/* Right side - Actions */}
          <div className="flex items-center xl:gap-4">
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <SearchLottie />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <SettingsSidebar />
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <BellLottie />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs flex items-center justify-center text-background">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
              <PopoverContent className={`w-80 p-0 rounded-xl shadow-lg ${fontClass}`} align="end">
                <div className="flex items-center justify-between p-4 border-b">
                <h3 className={`font-medium ${selectedFont} ${fontSizeClass}`}>Notifications</h3>
                <Button variant="ghost" size="sm" className={`${fontSizeClass} text-primary ${selectedFont}`}>
                    Mark all as read
                  </Button>
                </div>
                <div className={`max-h-80 overflow-y-auto ${selectedFont} ${fontSizeClass}`}>

                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-0 ${notification.read ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`text-sm font-medium ${selectedFont}`}>{notification.title}</h4>
                          <p className={`text-xs text-muted-foreground mt-1 ${selectedFont}`}>{notification.message}</p>
                          <span className={`text-xs text-muted-foreground mt-2 block ${selectedFont}`}>
                            {notification.time}
                          </span>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-sm text-primary w-full">
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="relative p-0 flex items-center gap-2 h-9 rounded-full pr-2 hover:bg-background"
    >
      <UserAvatar
        name={user?.name || 'User'}
        role={currentRole || ''}
        showInfo={false}
      />
      {!isMobile && (
        <span className="hidden xl:inline-block font-medium">{user?.name || 'User'}</span>
      )}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className={`w-56 rounded-xl ${fontClass}`} align="end">
    <div className="flex items-center p-2 border-b">
      <UserAvatar
        name={user?.name || 'User'}
        role={currentRole || ''}
        showInfo={true}
      />
    </div>

    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />

    {user?.roles && user.roles.length > 1 && (
      <>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <User className="mr-2 h-4 w-4 text-primary" />
            <span>Switch Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
          <DropdownMenuSubContent className={`rounded-xl ${fontClass}`}>
              {user.roles.map(role => (
                <DropdownMenuItem
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`${role === currentRole ? 'bg-primary/10 text-primary' : ''} ${fontClass}`}
                  disabled={isChangingRole}
                >
                  {role === currentRole && isChangingRole ? (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : null}
                  <span className="capitalize">{role}</span>
                  {role === currentRole && (
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
      <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate('/support')}>
        <HelpCircle className="mr-2 h-4 w-4" />
        <span>Help & Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate('/about')}>
        <Info className="mr-2 h-4 w-4 text-foreground" />
        <span>About Us</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuSeparator />

    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

          </div>
        </div>
      </div>
      
      {/* Search Panel */}
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  ShoppingBag,
  Mail,
  ChevronDown,
  Settings,
  BarChart,
  Building
} from 'lucide-react';
import AppLogo from '@/components/AppLogo';
import UserAvatar from '@/components/UserAvatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarProps {
  collapsed: boolean;
}

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  badge?: number;
}

interface NavGroupProps {
  label: string;
  icon: React.ReactNode;
  collapsed: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const NavItem = ({ href, label, icon, collapsed, badge }: NavItemProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : "text-sidebar-foreground"
      )}
    >
      <div className="flex items-center justify-center w-6 h-6">
        {icon}
      </div>
      {!collapsed && (
        <span className="flex-1">{label}</span>
      )}
      {!collapsed && badge !== undefined && (
        <span className="flex items-center justify-center h-5 w-5 text-xs rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

const NavGroup = ({ label, icon, collapsed, children, defaultOpen = false }: NavGroupProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={!collapsed && open} onOpenChange={collapsed ? undefined : setOpen}>
      <CollapsibleTrigger asChild>
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "text-sidebar-foreground"
        )}>
          <div className="flex items-center justify-center w-6 h-6">
            {icon}
          </div>
          {!collapsed && (
            <>
              <span className="flex-1">{label}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", open && "transform rotate-180")} />
            </>
          )}
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className={cn(
          "ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-2",
          collapsed && "hidden"
        )}>
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside className={cn(
      "bg-sidebar flex flex-col h-screen transition-all duration-300 ease-in-out rounded-r-xl",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="h-16 flex items-center px-3 border-b border-sidebar-border">
        <AppLogo collapsed={collapsed} className="text-sidebar-foreground" />
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-4">
          {!collapsed && <h2 className="text-xs uppercase text-sidebar-foreground/50 mb-2 px-3">Menu</h2>}
          <nav className="flex flex-col gap-1">
            <NavItem 
              href="/dashboard" 
              label="Dashboard" 
              icon={<LayoutDashboard size={18} />} 
              collapsed={collapsed} 
            />
            
            <NavGroup 
              label="Analytics" 
              icon={<BarChart size={18} />} 
              collapsed={collapsed}
              defaultOpen={true}
            >
              <NavItem 
                href="/analytics/reports" 
                label="Reports" 
                icon={<FileText size={16} />} 
                collapsed={collapsed} 
              />
              <NavItem 
                href="/analytics/performance" 
                label="Performance" 
                icon={<BarChart size={16} />} 
                collapsed={collapsed} 
              />
            </NavGroup>
            
            <NavGroup 
              label="CRM" 
              icon={<Building size={18} />} 
              collapsed={collapsed}
            >
              <NavItem 
                href="/crm/customers" 
                label="Customers" 
                icon={<Users size={16} />} 
                collapsed={collapsed} 
                badge={3}
              />
              <NavItem 
                href="/crm/deals" 
                label="Deals" 
                icon={<FileText size={16} />} 
                collapsed={collapsed} 
              />
            </NavGroup>

            <NavGroup 
              label="E-Commerce" 
              icon={<ShoppingBag size={18} />} 
              collapsed={collapsed}
              defaultOpen={true}
            >
              <NavItem 
                href="/ecommerce/products" 
                label="Products" 
                icon={<ShoppingBag size={16} />} 
                collapsed={collapsed} 
              />
              <NavItem 
                href="/ecommerce/orders" 
                label="Orders" 
                icon={<ShoppingBag size={16} />} 
                collapsed={collapsed}
                badge={2}
              />
              <NavItem 
                href="/ecommerce/customers" 
                label="Customers" 
                icon={<Users size={16} />} 
                collapsed={collapsed} 
              />
            </NavGroup>
            
            <NavItem 
              href="/calendar" 
              label="Calendar" 
              icon={<Calendar size={18} />} 
              collapsed={collapsed} 
            />
            
            <NavItem 
              href="/email" 
              label="Email" 
              icon={<Mail size={18} />} 
              collapsed={collapsed} 
              badge={5}
            />
            
            <NavItem 
              href="/chats" 
              label="Chats" 
              icon={<MessageSquare size={18} />} 
              collapsed={collapsed} 
            />

            <NavItem 
              href="/settings" 
              label="Settings" 
              icon={<Settings size={18} />} 
              collapsed={collapsed} 
            />
          </nav>
        </div>
      </div>

      <div className="p-3 border-t border-sidebar-border">
        <UserAvatar
          name="Mathew"
          role="Designer"
          showInfo={!collapsed}
          className="text-sidebar-foreground"
        />
      </div>
    </aside>
  );
};

export default Sidebar;

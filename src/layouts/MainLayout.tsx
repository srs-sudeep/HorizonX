import { ModuleSidebar, Navbar } from '@/components';
import { MainFooter } from '@/components';
import { SidebarProvider } from '@/core';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden relative">
        <ModuleSidebar />
        <div className="flex-1 flex flex-col relative overflow-auto bg-background">
          <div className="fixed -top-1/4 left-10 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="fixed -top-1/4 -right-40 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="fixed -bottom-1/4 right-0 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="fixed -bottom-1/4 left-0 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none"></div>
          <Navbar />
          <main className="flex-1 z-10">
            <Outlet />
          </main>
          <MainFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

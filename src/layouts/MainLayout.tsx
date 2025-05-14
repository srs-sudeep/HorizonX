import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import ModuleSidebar from '@/components/sidebar/ModuleSidebar';
import { SidebarProvider } from '@/core/context/sidebarContext';
import MainFooter from '@/components/footer/MainFooter';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <ModuleSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto p-6 bg-background">
            <Outlet />
          </main>
          <MainFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

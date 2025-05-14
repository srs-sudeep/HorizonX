import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import ModuleSidebar from '@/components/sidebar/ModuleSidebar';

const MainLayout = () => {
  return (
      <div className="flex h-screen overflow-hidden bg-background">
        <ModuleSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
          <footer className="px-6 py-3 text-xs text-muted-foreground border-t bg-muted/30">
            <div className="flex justify-between items-center">
              <span>© 2025 Codename. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <span>Terms</span>
                <span>Privacy</span>
                <span>Support</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
  );
};

export default MainLayout;

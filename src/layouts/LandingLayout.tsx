import { Outlet } from 'react-router-dom';
import LandingFooter from '@/components/footer/LandingFooter';
import LandingNavbar from '@/components/navbar/LandingNavbar';

const LandingLayout = () => {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <LandingNavbar />

      {/* Main content */}
      <main className="flex-1 bg-muted/30">
        <Outlet />
      </main>

      <LandingFooter />      
    </div>
  );
};

export default LandingLayout;

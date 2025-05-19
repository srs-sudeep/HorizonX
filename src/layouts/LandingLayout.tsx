import { Outlet } from 'react-router-dom';
import { LandingFooter } from '@/components/footer/LandingFooter';
import { LandingNavbar } from '@/components/navbar/LandingNavbar';

const LandingLayout = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <LandingNavbar />
      {/* Main content */}
      <main>
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;

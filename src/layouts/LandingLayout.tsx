import { Outlet } from 'react-router-dom';
import { LandingFooter, LandingNavbar } from '@/components';

const LandingLayout = () => {
  return (
    <div className="flex flex-col">
      <LandingNavbar />
      <main>
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;

import { createFileRoute } from '@tanstack/react-router';
import { useAuthStore } from '@store/index';
import { LandingPage } from '@components/LandingPage/LandingPage';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  const { isAuthenticated, user } = useAuthStore();
  
  // Always show the landing page on the root route
  return <LandingPage />;
  
  // If authenticated, we'll let the user navigate to their dashboard via buttons on the landing page
}

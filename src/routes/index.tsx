import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@store/index';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    // This is a client-side redirect
    const { isAuthenticated, user } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }

    // Redirect based on user role
    if (user) {
      throw redirect({
        to: `/${user.role}`,
      });
    }

    return {};
  },
  component: IndexPage,
});

function IndexPage() {
  return null;
}

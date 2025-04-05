import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../store";

export const Route = createFileRoute("/")({
	beforeLoad: async () => {
		// This is a client-side redirect
		const { isAuthenticated, user } = useAuthStore.getState();

		if (!isAuthenticated) {
			throw redirect({
				to: "/login",
			});
		}

		// Redirect based on user role
		if (user) {
			if (user.role === "admin") {
				throw redirect({
					to: "/admin",
				});
			} else if (user.role === "manager") {
				throw redirect({
					to: "/manager",
				});
			} else {
				throw redirect({
					to: "/user",
				});
			}
		}

		return {};
	},
	component: IndexPage,
});

function IndexPage() {
	return null;
}

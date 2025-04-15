import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "../../store";
import type { UserRole } from "../../types";

interface AuthGuardProps {
	children: ReactNode;
	allowedRoles?: UserRole[];
}

export const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
	const { isAuthenticated, user } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		// Add a small delay to prevent immediate redirection after logout
		const timer = setTimeout(() => {
			if (!isAuthenticated) {
				navigate({
					to: "/login",
					search: { returnUrl: window.location.pathname },
				});
				return;
			}

			if (allowedRoles && user && !allowedRoles.includes(user.role)) {
				navigate({ to: "/unauthorized" });
			}
		}, 100);
		
		return () => clearTimeout(timer);
	}, [isAuthenticated, user, allowedRoles, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	if (allowedRoles && user && !allowedRoles.includes(user.role)) {
		return null;
	}

	return <>{children}</>;
};

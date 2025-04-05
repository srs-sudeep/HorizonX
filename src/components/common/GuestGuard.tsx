import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "../../store";

interface GuestGuardProps {
	children: ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
	const { isAuthenticated } = useAuthStore();
	const navigate = useNavigate();
	// We'll handle the return URL manually
	const returnUrl = "/";

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: returnUrl || "/" });
		}
	}, [isAuthenticated, navigate, returnUrl]);

	if (isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};

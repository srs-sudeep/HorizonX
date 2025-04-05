import type { UserRole } from "./auth";

export interface RouteConfig {
	path: string;
	label: string;
	icon?: string;
	roles: UserRole[];
	children?: RouteConfig[];
}

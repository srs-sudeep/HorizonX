import type { RouteConfig } from "../types";
import { UserRole } from "../types/auth";

export const menuConfig: RouteConfig[] = [
	{
		path: "/",
		label: "Dashboard",
		icon: "dashboard",
		roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
	},
	{
		path: "/admin",
		label: "Admin",
		icon: "settings",
		roles: [UserRole.ADMIN],
		children: [
			{
				path: "/admin/users",
				label: "User Management",
				icon: "people",
				roles: [UserRole.ADMIN],
			},
			{
				path: "/admin/settings",
				label: "System Settings",
				icon: "settings",
				roles: [UserRole.ADMIN],
			},
		],
	},
	{
		path: "/manager",
		label: "Management",
		icon: "chart",
		roles: [UserRole.ADMIN, UserRole.MANAGER],
		children: [
			{
				path: "/manager/reports",
				label: "Reports",
				icon: "chart",
				roles: [UserRole.ADMIN, UserRole.MANAGER],
			},
			{
				path: "/manager/team",
				label: "Team",
				icon: "people",
				roles: [UserRole.ADMIN, UserRole.MANAGER],
			},
		],
	},
	{
		path: "/user",
		label: "User Area",
		icon: "person",
		roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
		children: [
			{
				path: "/user/profile",
				label: "Profile",
				icon: "person",
				roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
			},
			{
				path: "/user/notifications",
				label: "Notifications",
				icon: "notifications",
				roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
			},
		],
	},
	{
		path: "/help",
		label: "Help & Support",
		icon: "help",
		roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
	},
];

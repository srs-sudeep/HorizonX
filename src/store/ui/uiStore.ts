import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
	themeMode: "light" | "dark";
	sidebarOpen: boolean;
	toggleTheme: () => void;
	toggleSidebar: () => void;
	setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
	persist(
		(set) => ({
			themeMode: "light",
			sidebarOpen: true,

			toggleTheme: () =>
				set((state) => ({
					themeMode: state.themeMode === "light" ? "dark" : "light",
				})),

			toggleSidebar: () =>
				set((state) => ({
					sidebarOpen: !state.sidebarOpen,
				})),

			setSidebarOpen: (open) =>
				set({
					sidebarOpen: open,
				}),
		}),
		{
			name: "horizon-ui-storage",
		},
	),
);

import { Box, CssBaseline, Toolbar } from "@mui/material";
import type { ReactNode } from "react";
import { useAuthStore, useUIStore } from "../../store";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
	const { isAuthenticated } = useAuthStore();

	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<CssBaseline />
			<Header onToggleSidebar={toggleSidebar} />

			{isAuthenticated && (
				<Sidebar
					open={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
					onToggle={toggleSidebar}
				/>
			)}

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					p: 3,
					width: "100%",
				}}
			>
				<Toolbar /> {/* Spacer for fixed app bar */}
				<Box sx={{ flexGrow: 1, py: 2 }}>{children}</Box>
				<Footer />
			</Box>
		</Box>
	);
};

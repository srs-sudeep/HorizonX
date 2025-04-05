import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	Toolbar,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { menuConfig } from "../../../config/menuConfig";
import { useAuthStore } from "../../../store";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
	open: boolean;
	onClose: () => void;
	onToggle: () => void;
}

const drawerWidth = 240;

export const Sidebar = ({ open, onClose, onToggle }: SidebarProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [collapsed, setCollapsed] = useState(false);
	const { user } = useAuthStore();

	const handleDrawerToggle = () => {
		if (isMobile) {
			onClose();
		} else {
			setCollapsed(!collapsed);
			onToggle();
		}
	};

	// Filter menu items based on user role
	const filteredMenuItems = menuConfig.filter(
		(item) => user && item.roles.includes(user.role),
	);

	const drawer = (
		<>
			<Toolbar
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: collapsed ? "center" : "flex-end",
					px: [1],
				}}
			>
				<IconButton onClick={handleDrawerToggle}>
					{collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</Toolbar>
			<Divider />
			<List component="nav">
				{filteredMenuItems.map((item) => (
					<SidebarItem key={item.path} item={item} collapsed={collapsed} />
				))}
			</List>
		</>
	);

	return (
		<Box
			component="nav"
			sx={{ width: { md: open ? drawerWidth : 72 }, flexShrink: { md: 0 } }}
		>
			{/* Mobile drawer */}
			{isMobile ? (
				<Drawer
					variant="temporary"
					open={open}
					onClose={onClose}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile
					}}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			) : (
				// Desktop drawer
				<Drawer
					variant="permanent"
					open={!collapsed}
					sx={{
						display: { xs: "none", md: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: collapsed ? 72 : drawerWidth,
							transition: theme.transitions.create("width", {
								easing: theme.transitions.easing.sharp,
								duration: theme.transitions.duration.enteringScreen,
							}),
							overflowX: "hidden",
						},
					}}
				>
					{drawer}
				</Drawer>
			)}
		</Box>
	);
};

import {
	BarChart,
	Dashboard,
	ExpandLess,
	ExpandMore,
	Help,
	Mail,
	Notifications,
	People,
	Person,
	Settings,
	ShoppingCart,
} from "@mui/icons-material";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SvgIcon,
	Tooltip,
} from "@mui/material";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { useState } from "react";

interface SidebarItemProps {
	item: {
		path: string;
		label: string;
		icon?: string;
		children?: Array<{
			path: string;
			label: string;
			icon?: string;
		}>;
	};
	collapsed: boolean;
}

// Map of icon names to icon components
const iconMap: Record<string, React.ElementType> = {
	dashboard: Dashboard,
	people: People,
	settings: Settings,
	chart: BarChart,
	person: Person,
	cart: ShoppingCart,
	notifications: Notifications,
	mail: Mail,
	help: Help,
};

export const SidebarItem = ({ item, collapsed }: SidebarItemProps) => {
	const [open, setOpen] = useState(false);
	const matchRoute = useMatchRoute();
	const isActive = Boolean(matchRoute({ to: item.path, fuzzy: true }));

	const hasChildren = item.children && item.children.length > 0;

	const handleClick = () => {
		if (hasChildren) {
			setOpen(!open);
		}
	};

	// Get the icon component from the map, or use Dashboard as default
	const IconComponent =
		item.icon && iconMap[item.icon] ? iconMap[item.icon] : Dashboard;

	const listItemButton = (
		<ListItemButton
			component={hasChildren ? "div" : Link}
			to={hasChildren ? undefined : item.path}
			onClick={handleClick}
			selected={isActive}
			sx={{
				minHeight: 48,
				justifyContent: collapsed ? "center" : "initial",
				px: 2.5,
			}}
		>
			<Tooltip title={collapsed ? item.label : ""} placement="right">
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: collapsed ? 0 : 3,
						justifyContent: "center",
					}}
				>
					<SvgIcon component={IconComponent} />
				</ListItemIcon>
			</Tooltip>
			{!collapsed && (
				<>
					<ListItemText primary={item.label} />
					{hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
				</>
			)}
		</ListItemButton>
	);

	return (
		<>
			{listItemButton}
			{hasChildren && !collapsed && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{item.children?.map((child) => {
							const ChildIconComponent =
								child.icon && iconMap[child.icon]
									? iconMap[child.icon]
									: undefined;

							return (
								<ListItemButton
									key={child.path}
									component={Link}
									to={child.path}
									selected={Boolean(matchRoute({ to: child.path }))}
									sx={{ pl: 4 }}
								>
									{ChildIconComponent && (
										<ListItemIcon>
											<SvgIcon component={ChildIconComponent} />
										</ListItemIcon>
									)}
									<ListItemText primary={child.label} />
								</ListItemButton>
							);
						})}
					</List>
				</Collapse>
			)}
		</>
	);
};

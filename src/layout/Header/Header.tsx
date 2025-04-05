import {
	AccountCircle,
	Brightness4 as DarkModeIcon,
	Brightness7 as LightModeIcon,
	Logout,
	Menu as MenuIcon,
	Settings,
} from "@mui/icons-material";
import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore, useUIStore } from "../../store";

interface HeaderProps {
	onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { themeMode, toggleTheme } = useUIStore();
	const { user, logout } = useAuthStore();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		logout();
		handleClose();
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.text.primary,
			}}
			elevation={1}
		>
			<Toolbar>
				{user && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={onToggleSidebar}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
				)}

				<Typography
					variant="h6"
					component="div"
					sx={{
						flexGrow: 1,
						fontWeight: 700,
						color: theme.palette.primary.main,
					}}
				>
					Horizon
				</Typography>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton onClick={toggleTheme} color="inherit">
						{themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>

					{user ? (
						<>
							<Tooltip title="Account settings">
								<IconButton
									onClick={handleClick}
									size="small"
									sx={{ ml: 2 }}
									aria-controls={open ? "account-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
								>
									<Avatar
										sx={{ width: 32, height: 32 }}
										alt={user.name}
										src={user.avatar}
									>
										{user.name.charAt(0)}
									</Avatar>
								</IconButton>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								id="account-menu"
								open={open}
								onClose={handleClose}
								onClick={handleClose}
								transformOrigin={{ horizontal: "right", vertical: "top" }}
								anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
							>
								<MenuItem>
									<Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
										<Typography variant="subtitle2">{user.name}</Typography>
										<Typography variant="caption" color="text.secondary">
											{user.email}
										</Typography>
										<Typography variant="caption" color="primary">
											{user.role.toUpperCase()}
										</Typography>
									</Box>
								</MenuItem>
								<MenuItem component={Link} to="/profile">
									<AccountCircle fontSize="small" sx={{ mr: 1 }} />
									Profile
								</MenuItem>
								<MenuItem component={Link} to="/settings">
									<Settings fontSize="small" sx={{ mr: 1 }} />
									Settings
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<Logout fontSize="small" sx={{ mr: 1 }} />
									Logout
								</MenuItem>
							</Menu>
						</>
					) : (
						<>
							{!isMobile && (
								<Button
									component={Link}
									to="/login"
									color="inherit"
									sx={{ ml: 1 }}
								>
									Login
								</Button>
							)}
							<Button
								component={Link}
								to="/register"
								variant="contained"
								color="primary"
								sx={{ ml: 1 }}
							>
								{isMobile ? "Sign Up" : "Create Account"}
							</Button>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

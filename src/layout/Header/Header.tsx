import {
	AccountCircle,
	Brightness4 as DarkModeIcon,
	Brightness7 as LightModeIcon,
	Logout,
	Menu as MenuIcon,
	Settings,
	Search as SearchIcon,
	NotificationsOutlined,
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
	InputBase,
	Badge,
	alpha,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore, useUIStore } from "../../store";
import { Logo } from '@components/Logo';

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
			elevation={0}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={onToggleSidebar}
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>

				<Logo horizontal size={40} sx={{ mr: 4 }} />

				{/* Search Bar */}
				<Box
					sx={{
						position: 'relative',
						borderRadius: 1,
						backgroundColor: alpha(theme.palette.common.white, 0.15),
						'&:hover': {
							backgroundColor: alpha(theme.palette.common.white, 0.25),
						},
						mr: 2,
						flexGrow: 1,
						display: { xs: 'none', sm: 'flex' },
					}}
				>
					<IconButton sx={{ p: '10px' }} aria-label="search">
						<SearchIcon />
					</IconButton>
					<InputBase
						placeholder="Search..."
						sx={{
							color: 'inherit',
							flex: 1,
							'& .MuiInputBase-input': {
								padding: theme.spacing(1, 1, 1, 0),
							},
						}}
					/>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<IconButton color="inherit">
						<Badge badgeContent={4} color="error">
							<NotificationsOutlined />
						</Badge>
					</IconButton>

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
										sx={{ 
											width: 32, 
											height: 32,
											border: `2px solid ${theme.palette.primary.main}` 
										}}
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
								PaperProps={{
									sx: {
										mt: 1.5,
										minWidth: 220,
										borderRadius: 2,
										boxShadow: theme.shadows[8],
									},
								}}
							>
								<Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
									<Typography variant="subtitle1" fontWeight="bold">
										{user.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{user.email}
									</Typography>
									<Typography 
										variant="caption" 
										sx={{ 
											color: 'primary.main',
											display: 'inline-block',
											bgcolor: alpha(theme.palette.primary.main, 0.1),
											px: 1,
											py: 0.5,
											borderRadius: 1,
											mt: 1
										}}
									>
										{user.role.toUpperCase()}
									</Typography>
								</Box>
								<MenuItem component={Link} to="/profile">
									<AccountCircle fontSize="small" sx={{ mr: 2 }} />
									Profile
								</MenuItem>
								<MenuItem component={Link} to="/settings">
									<Settings fontSize="small" sx={{ mr: 2 }} />
									Settings
								</MenuItem>
								<Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, mt: 1 }}>
									<MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
										<Logout fontSize="small" sx={{ mr: 2 }} />
										Logout
									</MenuItem>
								</Box>
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


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
			<Logo horizontal size={40} sx={{ mr: 4 }} />
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={onToggleSidebar}
					sx={{
						ml: 4,
						backgroundColor: open => open ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
						borderRadius: '8px',
						padding: '8px',
						transition: theme.transitions.create(['background-color', 'transform'], {
							duration: theme.transitions.duration.shorter,
						}),
						'&:hover': {
							backgroundColor: alpha(theme.palette.primary.main, 0.8),
						},
						'&:active': {
							transform: 'scale(0.95)',
						},
					}}
				>
					<MenuIcon 
						sx={{
							fontSize: '1.25rem',
							color: theme.palette.text.primary,
							transition: theme.transitions.create('transform', {
								duration: theme.transitions.duration.shortest,
							}),
						}}
					/>
				</IconButton>
				
				{/* Spacer to push everything else to the right */}
				<Box sx={{ flexGrow: 1 }} />
				
				{/* Group all right-side elements */}
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					{/* Enhanced Search Bar */}
					<Box
						sx={{
							position: 'relative',
							borderRadius: '8px',
							backgroundColor: alpha(theme.palette.background.default, 0.15),
							'&:hover': {
								backgroundColor: alpha(theme.palette.background.default, 0.25),
							},
							mr: 2,
							py: 0.5,
							width: { xs: '100%', sm: 'auto' },
							minWidth: '400px',
							display: { xs: 'none', sm: 'flex' },
							border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
							transition: theme.transitions.create(['width', 'background-color']),
							'&:focus-within': {
								backgroundColor: alpha(theme.palette.background.default, 0.25),
								boxShadow: `0 2px 8px 0 ${alpha(theme.palette.primary.main, 0.15)}`,
								borderColor: alpha(theme.palette.primary.main, 0.25),
							},
						}}
					>
						<IconButton 
							sx={{ 
								p: '8px',
								color: theme.palette.text.secondary,
							}} 
							aria-label="search"
						>
							<SearchIcon fontSize="small" />
						</IconButton>
						<InputBase
							placeholder="Search..."
							sx={{
								color: theme.palette.text.primary,
								width: '100%',
								'& .MuiInputBase-input': {
									padding: theme.spacing(1, 1, 1, 0),
									fontSize: '0.875rem',
									transition: theme.transitions.create('width'),
									width: '100%',
									'&::placeholder': {
										color: theme.palette.text.secondary,
										opacity: 0.7,
									},
								},
							}}
							endAdornment={
								<IconButton 
									size="small" 
									sx={{ 
										visibility: 'hidden', 
										opacity: 0,
										transition: '0.2s',
										mr: 0.5,
										p: 0.5,
										color: theme.palette.text.secondary,
										'&:hover': {
											backgroundColor: alpha(theme.palette.divider, 0.1),
										},
										'.MuiInputBase-root:focus-within &': {
											visibility: 'visible',
											opacity: 1,
										}
									}}
								>
									<Box 
										component="span" 
										sx={{ 
											fontSize: '0.65rem', 
											fontWeight: 'bold',
											px: 0.5,
											py: 0.25,
											borderRadius: 0.5,
											border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
											color: theme.palette.text.secondary,
											bgcolor: alpha(theme.palette.background.paper, 0.8),
										}}
									>
										⌘K
									</Box>
								</IconButton>
							}
						/>
					</Box>

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


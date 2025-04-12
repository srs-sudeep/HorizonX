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
	Divider,
	Popover,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
	const [searchInputRef, setSearchInputRef] = useState<HTMLInputElement | null>(null);
	const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
	const [scrolled, setScrolled] = useState(false);
	const open = Boolean(anchorEl);
	const notificationsOpen = Boolean(notificationAnchorEl);

	// Add scroll detection
	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrolled]);

	// Add this handler for notification button click
	const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
		setNotificationAnchorEl(event.currentTarget);
	};

	// Add this handler to close notifications
	const handleNotificationClose = () => {
		setNotificationAnchorEl(null);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Check for Command+K or Ctrl+K
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault();
				searchInputRef?.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [searchInputRef]);

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
				backgroundColor: theme => alpha(theme.palette.background.paper, scrolled ? 0.95 : 0.85),
				backdropFilter: 'blur(10px)',
				color: theme.palette.text.primary,
				borderBottom: `1px solid ${alpha(theme.palette.divider, scrolled ? 0.12 : 0.08)}`,
				boxShadow: scrolled 
					? `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.08)}`
					: `0 1px 10px 0 ${alpha(theme.palette.primary.main, 0.05)}`,
				transition: theme.transitions.create(
					['box-shadow', 'background-color', 'border-bottom'],
					{ duration: theme.transitions.duration.standard }
				),
				borderRadius: 0, // Add this to ensure no border radius
			}}
			elevation={0}
		>
			<Toolbar sx={{ px: { xs: 2, md: 3 } }}>
				<Logo horizontal size={40} sx={{ mr: 4 }} />
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={onToggleSidebar}
					sx={{
						ml: 2,
						backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
						borderRadius: '10px',
						padding: '8px',
						transition: theme.transitions.create(['background-color', 'transform'], {
							duration: theme.transitions.duration.shorter,
						}),
						'&:hover': {
							backgroundColor: theme => alpha(theme.palette.primary.main, 0.15),
							transform: 'translateY(-2px)',
						},
						'&:active': {
							transform: 'scale(0.95)',
						},
					}}
				>
					<MenuIcon 
						sx={{
							fontSize: '1.25rem',
							color: theme.palette.primary.main,
						}}
					/>
				</IconButton>
				
				{/* Spacer to push everything else to the right */}
				<Box sx={{ flexGrow: 1 }} />
				
				{/* Group all right-side elements */}
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
					{/* Enhanced Search Bar */}
					<Box
						sx={{
							position: 'relative',
							borderRadius: '12px',
							backgroundColor: theme => alpha(theme.palette.background.default, 0.6),
							'&:hover': {
								backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
								boxShadow: `0 4px 12px 0 ${alpha(theme.palette.primary.main, 0.08)}`,
							},
							mr: 2,
							py: 0.5,
							width: { xs: '100%', sm: 'auto' },
							minWidth: '400px',
							display: { xs: 'none', sm: 'flex' },
							border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
							transition: theme.transitions.create(['width', 'background-color', 'box-shadow', 'border-color'], {
								duration: theme.transitions.duration.shorter,
							}),
							'&:focus-within': {
								backgroundColor: theme => alpha(theme.palette.background.paper, 0.95),
								boxShadow: `0 4px 16px 0 ${alpha(theme.palette.primary.main, 0.15)}`,
								borderColor: alpha(theme.palette.primary.main, 0.3),
								transform: 'translateY(-2px)',
								width: { sm: '450px' }, // Expand width when focused
							},
						}}
					>
						<IconButton 
							sx={{ 
								p: '8px',
								color: theme.palette.primary.main,
								opacity: 0.7,
								transition: 'opacity 0.2s ease',
								'&:hover': {
									opacity: 1,
									backgroundColor: 'transparent',
								},
							}} 
							aria-label="search"
						>
							<SearchIcon fontSize="small" />
						</IconButton>
						<InputBase
							inputRef={setSearchInputRef}
							placeholder="Search anything..."
							sx={{
								color: theme.palette.text.primary,
								width: '100%',
								'& .MuiInputBase-input': {
									padding: theme.spacing(1, 1, 1, 0),
									fontSize: '0.875rem',
									fontWeight: 500,
									transition: theme.transitions.create('width'),
									width: '100%',
									'&::placeholder': {
										color: theme.palette.text.secondary,
										opacity: 0.7,
										fontWeight: 400,
									},
								},
							}}
							endAdornment={
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
									<Divider orientation="vertical" flexItem sx={{ height: 20, mx: 0.5, opacity: 0.3 }} />
									<Box 
										component="span" 
										sx={{ 
											fontSize: '0.65rem', 
											fontWeight: 'bold',
											px: 0.8,
											py: 0.4,
											borderRadius: '6px',
											border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
											color: theme.palette.text.secondary,
											bgcolor: alpha(theme.palette.background.paper, 0.8),
											boxShadow: `0 1px 2px 0 ${alpha(theme.palette.common.black, 0.05)}`,
											display: 'flex',
											alignItems: 'center',
											gap: 0.3,
										}}
									>
										<Box component="span" sx={{ 
											fontSize: '0.6rem', 
											opacity: 0.7,
											lineHeight: 1,
										}}>⌘</Box>
										<Box component="span">K</Box>
									</Box>
								</Box>
							}
						/>
					</Box>

					{/* Notification Button */}
					<IconButton 
						color="inherit"
						onClick={handleNotificationClick}
						sx={{
							backgroundColor: theme => alpha(theme.palette.background.default, 0.6),
							borderRadius: '10px',
							padding: '8px',
							border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
							transition: 'all 0.2s ease',
							'&:hover': {
								backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
								transform: 'translateY(-2px)',
								boxShadow: `0 4px 8px 0 ${alpha(theme.palette.common.black, 0.05)}`,
							},
						}}
					>
						<Badge 
							badgeContent={4} 
							color="error"
							sx={{
								'& .MuiBadge-badge': {
									fontSize: '0.6rem',
									height: 16,
									minWidth: 16,
									padding: '0 4px',
									boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
									animation: notificationsOpen ? 'none' : 'pulse 2s infinite',
									'@keyframes pulse': {
										'0%': {
											boxShadow: `0 0 0 0 ${alpha(theme.palette.error.main, 0.7)}`,
										},
										'70%': {
											boxShadow: `0 0 0 6px ${alpha(theme.palette.error.main, 0)}`,
										},
										'100%': {
											boxShadow: `0 0 0 0 ${alpha(theme.palette.error.main, 0)}`,
										},
									},
								}
							}}
						>
							<NotificationsOutlined fontSize="small" />
						</Badge>
					</IconButton>

					{/* Notification Popover */}
					<Popover
						open={notificationsOpen}
						anchorEl={notificationAnchorEl}
						onClose={handleNotificationClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						PaperProps={{
							sx: {
								mt: 1.5,
								width: 320,
								borderRadius: 2,
								boxShadow: theme.shadows[8],
								border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
							}
						}}
					>
						<Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Typography variant="h6">Notifications</Typography>
							<Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
								Mark all as read
							</Typography>
						</Box>
						<Divider />
						<List sx={{ p: 0 }}>
							<ListItem sx={{ py: 2, px: 2.5 }}>
								<ListItemText 
									primary="New Task Assigned"
									secondary="You were assigned a new task 'Implement login page' 1 day ago."
									secondaryTypographyProps={{ 
										variant: 'body2', 
										color: 'text.secondary',
										sx: { mt: 0.5 }
									}}
								/>
							</ListItem>
							<Divider component="li" />
							<ListItem sx={{ py: 2, px: 2.5 }}>
								<ListItemText 
									primary="Comment Added"
									secondary="You commented on 'API Documentation' 2 days ago."
									secondaryTypographyProps={{ 
										variant: 'body2', 
										color: 'text.secondary',
										sx: { mt: 0.5 }
									}}
								/>
							</ListItem>
							<Divider component="li" />
							<ListItem sx={{ py: 2, px: 2.5 }}>
								<ListItemText 
									primary="Project Update"
									secondary="The project 'HorizonX' has been updated to version 1.2.0"
									secondaryTypographyProps={{ 
										variant: 'body2', 
										color: 'text.secondary',
										sx: { mt: 0.5 }
									}}
								/>
							</ListItem>
							<Divider component="li" />
							<ListItem sx={{ py: 2, px: 2.5 }}>
								<ListItemText 
									primary="Meeting Reminder"
									secondary="Team standup meeting in 30 minutes"
									secondaryTypographyProps={{ 
										variant: 'body2', 
										color: 'text.secondary',
										sx: { mt: 0.5 }
									}}
								/>
							</ListItem>
						</List>
						<Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
							<Button 
								fullWidth 
								variant="text" 
								color="primary"
								sx={{ borderRadius: 1.5, py: 1 }}
							>
								View All Notifications
							</Button>
						</Box>
					</Popover>

					{/* Theme Toggle Button */}
					<IconButton 
						onClick={toggleTheme} 
						color="inherit"
						sx={{
							backgroundColor: theme => alpha(theme.palette.background.default, 0.6),
							borderRadius: '10px',
							padding: '8px',
							border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
							transition: 'all 0.2s ease',
							'&:hover': {
								backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
								transform: 'translateY(-2px)',
								boxShadow: `0 4px 8px 0 ${alpha(theme.palette.common.black, 0.05)}`,
							},
						}}
					>
						{themeMode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
					</IconButton>

					{user ? (
						<>
							<Tooltip title="Account settings">
								<IconButton
									onClick={handleClick}
									size="small"
									sx={{ 
										ml: 1,
										p: 0.5,
										border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
										transition: 'all 0.2s ease',
										'&:hover': {
											borderColor: theme.palette.primary.main,
											transform: 'translateY(-2px) scale(1.05)',
											boxShadow: `0 4px 8px 0 ${alpha(theme.palette.primary.main, 0.15)}`,
										},
										'&:active': {
											transform: 'translateY(0) scale(0.95)',
										},
									}}
									aria-controls={open ? "account-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
								>
									<Avatar
										sx={{ 
											width: 32, 
											height: 32,
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
										minWidth: 240,
										borderRadius: 2,
										boxShadow: theme.shadows[8],
										border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
										overflow: 'visible',
										'&:before': {
											content: '""',
											display: 'block',
											position: 'absolute',
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: 'background.paper',
											transform: 'translateY(-50%) rotate(45deg)',
											zIndex: 0,
											borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
											borderLeft: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
										},
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
											px: 1.5,
											py: 0.5,
											borderRadius: 1,
											mt: 1,
											fontWeight: 600,
										}}
									>
										{user.role.toUpperCase()}
									</Typography>
								</Box>
								<MenuItem component={Link} to="/profile" sx={{ py: 1.5 }}>
									<AccountCircle fontSize="small" sx={{ mr: 2, color: theme.palette.primary.main }} />
									Profile
								</MenuItem>
								<MenuItem component={Link} to="/settings" sx={{ py: 1.5 }}>
									<Settings fontSize="small" sx={{ mr: 2, color: theme.palette.primary.main }} />
									Settings
								</MenuItem>
								<Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, mt: 1 }}>
									<MenuItem onClick={handleLogout} sx={{ color: 'error.main', py: 1.5 }}>
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
									sx={{ 
										ml: 1,
										borderRadius: '10px',
										px: 2,
										py: 1,
										border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
										transition: 'all 0.2s ease',
										'&:hover': {
											backgroundColor: alpha(theme.palette.background.default, 0.8),
											transform: 'translateY(-2px)',
											boxShadow: `0 4px 8px 0 ${alpha(theme.palette.common.black, 0.05)}`,
										},
									}}
								>
									Login
								</Button>
							)}
							<Button
								component={Link}
								to="/register"
								variant="contained"
								color="primary"
								sx={{ 
									ml: 1,
									borderRadius: '10px',
									px: 2,
									py: 1,
									boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.25)}`,
									transition: 'all 0.2s ease',
									'&:hover': {
										transform: 'translateY(-2px)',
										boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.35)}`,
									},
								}}
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


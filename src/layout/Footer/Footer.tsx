import { Box, Container, Link as MuiLink, Typography } from "@mui/material";

export const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				py: 1,
				height: '40px',
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				display: 'flex',
				alignItems: 'center',
				borderTop: '1px solid',
				borderColor: 'divider',
			}}
		>
			<Container maxWidth="lg">
				<Typography variant="caption" color="text.secondary" align="center" display="block">
					© {new Date().getFullYear()}{" "}
					<MuiLink color="inherit" href="/">
						Horizon
					</MuiLink>
					{" - All rights reserved."}
				</Typography>
			</Container>
		</Box>
	);
};


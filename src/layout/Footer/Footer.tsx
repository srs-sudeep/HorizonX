import { Box, Container, Link as MuiLink, Typography } from "@mui/material";

export const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				py: 3,
				px: 2,
				mt: "auto",
				backgroundColor: (theme) =>
					theme.palette.mode === "light"
						? theme.palette.grey[100]
						: theme.palette.grey[900],
			}}
		>
			<Container maxWidth="lg">
				<Typography variant="body2" color="text.secondary" align="center">
					{"© "}
					{new Date().getFullYear()}{" "}
					<MuiLink color="inherit" href="/">
						Horizon
					</MuiLink>
					{" - All rights reserved."}
				</Typography>
			</Container>
		</Box>
	);
};

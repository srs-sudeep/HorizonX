import { Error as ErrorIcon } from "@mui/icons-material";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthorized")({
	component: UnauthorizedPage,
});

function UnauthorizedPage() {
	return (
		<Container maxWidth="md">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "60vh",
					textAlign: "center",
				}}
			>
				<Paper
					elevation={3}
					sx={{
						p: 5,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
						maxWidth: 600,
						borderRadius: 2,
					}}
				>
					<ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />

					<Typography variant="h4" gutterBottom>
						Access Denied
					</Typography>

					<Typography variant="body1" color="text.secondary" paragraph>
						You don't have permission to access this page. Please contact your
						administrator if you believe this is an error.
					</Typography>

					<Box sx={{ mt: 3, display: "flex", gap: 2 }}>
						<Button component={Link} to="/" variant="contained" color="primary">
							Go to Dashboard
						</Button>

						<Button
							component="a"
							href="mailto:support@horizon.com"
							variant="outlined"
						>
							Contact Support
						</Button>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
}

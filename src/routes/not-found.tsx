import { SentimentDissatisfied as SadIcon } from "@mui/icons-material";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/not-found")({
	component: NotFoundPage,
});

function NotFoundPage() {
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
					<SadIcon color="primary" sx={{ fontSize: 80, mb: 2 }} />

					<Typography variant="h1" gutterBottom sx={{ fontWeight: "bold" }}>
						404
					</Typography>

					<Typography variant="h4" gutterBottom>
						Page Not Found
					</Typography>

					<Typography variant="body1" color="text.secondary" paragraph>
						The page you are looking for might have been removed, had its name
						changed, or is temporarily unavailable.
					</Typography>

					<Button
						component={Link}
						to="/"
						variant="contained"
						color="primary"
						size="large"
						sx={{ mt: 2 }}
					>
						Go to Homepage
					</Button>
				</Paper>
			</Box>
		</Container>
	);
}

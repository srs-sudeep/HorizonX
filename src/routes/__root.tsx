import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Layout } from "../layout/Layout";
import { useUIStore } from "../store";
import { darkTheme, lightTheme } from "../theme";

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 60, // 1 hour
			retry: 1,
		},
	},
});

export const Route = createRootRoute({
	component: () => {
		const { themeMode } = useUIStore();
		const theme = themeMode === "dark" ? darkTheme : lightTheme;

		return (
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Layout>
						<Outlet />
					</Layout>
					{/* Development tools */}
					<TanStackRouterDevtools />
				</ThemeProvider>
			</QueryClientProvider>
		);
	},
});

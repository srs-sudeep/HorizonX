import type { Components, Theme } from "@mui/material";
import { MuiButton } from "./MuiButton";

export const components: Components<Theme> = {
	MuiButton,
	MuiCard: {
		styleOverrides: {
			root: {
				borderRadius: 12,
				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
			},
		},
	},
	MuiPaper: {
		styleOverrides: {
			root: {
				borderRadius: 12,
			},
		},
	},
	MuiAppBar: {
		styleOverrides: {
			root: {
				boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
			},
		},
	},
	MuiDrawer: {
		styleOverrides: {
			paper: {
				borderRight: "none",
			},
		},
	},
	MuiListItemButton: {
		styleOverrides: {
			root: {
				borderRadius: 8,
				margin: "4px 8px",
				"&.Mui-selected": {
					backgroundColor: "rgba(33, 150, 243, 0.08)",
					"&:hover": {
						backgroundColor: "rgba(33, 150, 243, 0.12)",
					},
				},
			},
		},
	},
	MuiTextField: {
		styleOverrides: {
			root: {
				"& .MuiOutlinedInput-root": {
					borderRadius: 8,
				},
			},
		},
	},
};

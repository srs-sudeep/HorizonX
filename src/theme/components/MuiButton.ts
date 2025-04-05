import type { Components, Theme } from "@mui/material";

export const MuiButton: Components<Theme>["MuiButton"] = {
	styleOverrides: {
		root: {
			borderRadius: 8,
			textTransform: "none",
			fontWeight: 600,
		},
		contained: {
			boxShadow: "none",
			"&:hover": {
				boxShadow: "none",
			},
		},
		outlined: {
			"&:hover": {
				backgroundColor: "rgba(33, 150, 243, 0.04)",
			},
		},
		sizeLarge: {
			padding: "12px 24px",
			fontSize: "1rem",
		},
		sizeMedium: {
			padding: "8px 16px",
		},
		sizeSmall: {
			padding: "4px 10px",
		},
	},
};

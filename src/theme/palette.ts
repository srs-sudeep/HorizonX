import type { PaletteOptions } from "@mui/material";

export const lightPalette: PaletteOptions = {
	mode: "light",
	primary: {
		main: "#2196f3",
		light: "#4dabf5",
		dark: "#1769aa",
		contrastText: "#fff",
	},
	secondary: {
		main: "#f50057",
		light: "#f73378",
		dark: "#ab003c",
		contrastText: "#fff",
	},
	background: {
		default: "#f5f5f5",
		paper: "#fff",
	},
	text: {
		primary: "rgba(0, 0, 0, 0.87)",
		secondary: "rgba(0, 0, 0, 0.6)",
		disabled: "rgba(0, 0, 0, 0.38)",
	},
};

export const darkPalette: PaletteOptions = {
	mode: "dark",
	primary: {
		main: "#90caf9",
		light: "#e3f2fd",
		dark: "#42a5f5",
		contrastText: "rgba(0, 0, 0, 0.87)",
	},
	secondary: {
		main: "#f48fb1",
		light: "#fce4ec",
		dark: "#f06292",
		contrastText: "rgba(0, 0, 0, 0.87)",
	},
	background: {
		default: "#121212",
		paper: "#1e1e1e",
	},
	text: {
		primary: "#fff",
		secondary: "rgba(255, 255, 255, 0.7)",
		disabled: "rgba(255, 255, 255, 0.5)",
	},
};

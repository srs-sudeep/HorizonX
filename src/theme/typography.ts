import type { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography: TypographyOptions = {
	fontFamily: [
		"Inter",
		"-apple-system",
		"BlinkMacSystemFont",
		'"Segoe UI"',
		"Roboto",
		'"Helvetica Neue"',
		"Arial",
		"sans-serif",
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(","),
	h1: {
		fontWeight: 700,
		fontSize: "2.5rem",
		lineHeight: 1.2,
	},
	h2: {
		fontWeight: 700,
		fontSize: "2rem",
		lineHeight: 1.2,
	},
	h3: {
		fontWeight: 600,
		fontSize: "1.75rem",
		lineHeight: 1.2,
	},
	h4: {
		fontWeight: 600,
		fontSize: "1.5rem",
		lineHeight: 1.2,
	},
	h5: {
		fontWeight: 600,
		fontSize: "1.25rem",
		lineHeight: 1.2,
	},
	h6: {
		fontWeight: 600,
		fontSize: "1rem",
		lineHeight: 1.2,
	},
	subtitle1: {
		fontWeight: 500,
		fontSize: "1rem",
		lineHeight: 1.5,
	},
	subtitle2: {
		fontWeight: 500,
		fontSize: "0.875rem",
		lineHeight: 1.57,
	},
	body1: {
		fontSize: "1rem",
		lineHeight: 1.5,
	},
	body2: {
		fontSize: "0.875rem",
		lineHeight: 1.57,
	},
	button: {
		fontWeight: 600,
		fontSize: "0.875rem",
		lineHeight: 1.75,
		textTransform: "none",
	},
	caption: {
		fontSize: "0.75rem",
		lineHeight: 1.66,
	},
	overline: {
		fontSize: "0.75rem",
		fontWeight: 600,
		lineHeight: 2.66,
		textTransform: "uppercase",
	},
};

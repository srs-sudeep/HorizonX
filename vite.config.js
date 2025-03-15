import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import AutoExport from "unplugin-auto-export/vite";
import TurboConsole from "unplugin-turbo-console/vite";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({ autoCodeSplitting: true }),
		viteReact(),
		checker({
			typescript: true,
		}),
		biomePlugin({
			mode: "check",
			files: ".",
			applyFixes: true,
		}),
		AutoExport({
			// Directories to watch, paths can use aliases; It just needs to end with /*
			path: ["~/views/**/{components,hooks}/*", "~/hooks/*"],
			// Directories or files to ignore (optional)
			ignore: ["**/node_modules/*"],
			// File extension (default is 'ts') `ts` | `js`
			extname: "ts",
			// Custom export format
			formatter: (filename, extname) => `export * from './${filename}'`,
		}),
		TurboConsole(),
	],
	test: {
		globals: true,
		environment: "jsdom",
	},
});

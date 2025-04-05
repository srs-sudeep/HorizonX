import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/page")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<h1 className="text-3xl font-bold underline text-amber-400">
			Hello world!
		</h1>
	);
}

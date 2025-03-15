import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/page")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/page"!</div>;
}

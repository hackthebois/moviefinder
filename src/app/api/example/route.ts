import { NextResponse } from "next/server";

// Example route
// Find at /api/example (file based routing)
// https://beta.nextjs.org/docs/routing/route-handlers

export const GET = () => {
	return NextResponse.json({ example: "This is an example get request" });
};

export const POST = async (request: Request) => {
	const body: unknown = await request.json();

	// do something with body
	console.log(body);

	return NextResponse.json({ exampleBody: body });
};

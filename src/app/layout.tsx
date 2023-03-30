import "../styles/globals.css";

export const metadata = {
	title: "Movie finder",
	description: "App for finding movies/tv shows using ai",
};

const Layout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { query: string };
}) => {
	console.log(params);
	return (
		<html>
			<body className="bg-slate-100">
				<main className="m-auto flex h-full min-h-screen w-full max-w-screen-lg flex-col items-center justify-center p-4 md:p-8">
					{children}
				</main>
			</body>
		</html>
	);
};

export default Layout;

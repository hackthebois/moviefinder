import "../styles/globals.css";

export const metadata = {
	title: "Movie finder",
	description: "App for finding movies/tv shows using ai",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<body>
				<main className="m-auto h-full w-full max-w-screen-xl">
					{children}
				</main>
			</body>
		</html>
	);
};

export default Layout;

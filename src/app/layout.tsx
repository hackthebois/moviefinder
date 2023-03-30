import "../styles/globals.css";
import Providers from "./Providers";

export const metadata = {
	title: "Movie finder",
	description: "App for finding movies/tv shows using ai",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html>
			<body className="bg-slate-100">
				<main className="m-auto flex h-full min-h-screen w-full max-w-screen-lg flex-col items-center justify-center p-4 md:p-8">
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	);
};

export default Layout;

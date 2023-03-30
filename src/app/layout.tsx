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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default Layout;

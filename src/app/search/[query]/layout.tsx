import SearchBar from "~/app/SearchBar";

const Layout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { query: string };
}) => {
	if (!params.query) {
		return (
			<>
				<SearchBar defaultQuery={""} />
				{children}
			</>
		);
	}

	const query = decodeURIComponent(params.query);

	return (
		<>
			<SearchBar defaultQuery={query} />
			{children}
		</>
	);
};

export default Layout;

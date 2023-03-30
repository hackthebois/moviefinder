import SearchPage from "./SearchPage";

export const dynamic = "force-dynamic";

type Props = {
	searchParams: {
		query?: string;
	};
};

const Page = ({ searchParams }: Props) => {
	const query = decodeURIComponent(searchParams.query ?? "");

	return <SearchPage query={query} />;
};

export default Page;

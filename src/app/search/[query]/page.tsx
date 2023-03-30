import { Suspense } from "react";
import LoadingPage from "~/app/components/LoadingPage";
import SearchBar from "~/app/SearchBar";
import RecordList from "./RecordList";

type Props = {
	params: {
		query: string;
	};
};

const Page = ({ params }: Props) => {
	if (!params.query) {
		return <div className="flex-1">enter a search</div>;
	}
	const query = decodeURIComponent(params.query);

	return (
		<>
			<SearchBar defaultQuery={query} />
			<Suspense fallback={<LoadingPage />}>
				{/* @ts-expect-error Server Component */}
				<RecordList query={query} />
			</Suspense>
		</>
	);
};

export default Page;

import SearchBar from "./SearchBar";
import Image from "next/image";
import RecordList from "./RecordList";

export const dynamic = "force-dynamic";

type Props = {
	searchParams: {
		query?: string;
	};
};

const Page = ({ searchParams }: Props) => {
	const query = decodeURIComponent(searchParams.query ?? "");

	return (
		<>
			<SearchBar defaultQuery={query} />
			{query !== "" && <RecordList />}
			<div className="mt-12">
				<div className="flex items-center">
					<p className="mr-2 italic ">powered by</p>
					<Image
						src="/openai-logo.png"
						alt="Logo for Open AI"
						width={85}
						height={50}
					/>
				</div>
			</div>
		</>
	);
};

export default Page;

import AnimatedContainer from "./AnimatedContainer";
import AITrademark from "./components/AITrademark";
import SearchBar from "./SearchBar";
import SearchPage from "./SearchPage";
import TitlePage from "./TitlePage";

export const dynamic = "force-dynamic";

type Props = {
	searchParams: {
		query?: string;
		title?: string;
	};
};

const Page = ({ searchParams }: Props) => {
	const query = decodeURIComponent(searchParams.query ?? "");
	const title = decodeURIComponent(searchParams.title ?? "");

	console.log(title, query);

	return (
		<AnimatedContainer>
			<main className="m-auto flex h-full min-h-screen w-full max-w-screen-lg flex-col items-center justify-center p-4 md:p-8">
				<SearchBar query={query} />
				{title !== "" ? (
					<>
						{/* @ts-expect-error Server Component */}
						<TitlePage title={title} />
					</>
				) : (
					query !== "" && <SearchPage query={query} />
				)}
				<AITrademark />
			</main>
		</AnimatedContainer>
	);
};

export default Page;

import Image from "next/image";
import SearchBar from "./SearchBar";

const Page = () => {
	return (
		<>
			<SearchBar />
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

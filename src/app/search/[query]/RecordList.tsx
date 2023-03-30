import { z } from "zod";
import { env } from "~/env.mjs";
import { FaChevronRight } from "react-icons/fa";

const SearchSchema = z
	.object({
		name: z.string().optional(),
		releaseYear: z.string().optional(),
		description: z.string().optional(),
	})
	.array();

const search = async ({ query }: { query: string }) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
		cache: "no-store",
	});
	const data: unknown = await res.json();
	const records = SearchSchema.parse(data);
	return records;
};
type Props = {
	query: string;
};

const RecordList = async ({ query }: Props) => {
	const records = await search({ query });

	return (
		<div className="mt-2 w-full flex-1 sm:mt-4">
			{records.map(({ name, releaseYear, description }, index) => {
				if (name && releaseYear && description) {
					return (
						<div
							key={index}
							className="my-4 flex w-full cursor-pointer items-center justify-between rounded-lg bg-white py-3 pl-5 pr-4 shadow-md transition hover:shadow-lg sm:px-6 sm:py-4"
						>
							<div>
								<p className=" mb-1 sm:text-lg md:mb-2">
									{name}
								</p>
								<p className="text-sm text-slate-500 sm:text-base md:mb-1">
									{releaseYear}
								</p>
								<p className="text-sm text-slate-500 sm:text-base">
									{description}
								</p>
							</div>
							<FaChevronRight
								className="ml-3 text-slate-400"
								size={20}
							/>
						</div>
					);
				}
			})}
		</div>
	);
};

export default RecordList;

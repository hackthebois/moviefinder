"use client";

import { z } from "zod";
import { env } from "~/env.mjs";
import { FaChevronRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "./loading";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AITrademark from "./components/AITrademark";
import { Field, Form } from "houseform";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

const SearchPage = ({ query }: Props) => {
	const router = useRouter();
	const { data: records = [], isLoading } = useQuery({
		queryFn: () => search({ query }),
		queryKey: ["search", query],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		cacheTime: 0,
	});

	const [parent] = useAutoAnimate();

	return (
		<main
			className="m-auto flex h-full min-h-screen w-full max-w-screen-lg flex-col items-center justify-center p-4 md:p-8"
			ref={parent}
		>
			<Form<{ query: string }>
				onSubmit={({ query }) => {
					router.push(`?query=${query}`);
				}}
			>
				{({ submit, setIsDirty, isDirty }) => (
					<div className="flex w-full rounded-lg bg-white shadow-md">
						<div className="flex h-14 w-14 items-center justify-center text-slate-400">
							<FaSearch size={22} />
						</div>
						<Field<string>
							name="query"
							initialValue={query}
							onChangeValidate={z.string().min(1)}
						>
							{({ value, setValue, onBlur }) => (
								<input
									value={value}
									onChange={(e) => setValue(e.target.value)}
									onBlur={onBlur}
									onKeyDown={(e) => {
										if (e.code === "Enter" && isDirty) {
											submit()
												.then(() => setIsDirty(false))
												.catch((e) => console.log(e));
										}
									}}
									className="flex-1 rounded-r-lg outline-none"
									placeholder="Ask a question or search for media"
								/>
							)}
						</Field>
						<input
							type="submit"
							hidden
							onClick={() => {
								submit().catch((e) => console.log(e));
							}}
						/>
					</div>
				)}
			</Form>
			{query !== "" && (
				<>
					{isLoading ? (
						<LoadingPage />
					) : (
						<div className="mt-2 w-full flex-1 sm:mt-4">
							{records.map(
								({ name, releaseYear, description }, index) => {
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
								}
							)}
						</div>
					)}
				</>
			)}
			<AITrademark />
		</main>
	);
};

export default SearchPage;

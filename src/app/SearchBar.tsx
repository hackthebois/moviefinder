"use client";

import { Field, Form } from "houseform";
import { z } from "zod";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
	defaultQuery?: string;
};
const SearchBar = ({ defaultQuery = "" }: Props) => {
	const router = useRouter();

	return (
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
						initialValue={defaultQuery}
						onChangeValidate={z.string().min(1)}
					>
						{({ value, setValue, onBlur, errors }) => (
							<>
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
								{errors &&
									errors.map((error, index) => (
										<p key={index}>{error}</p>
									))}
							</>
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
	);
};

export default SearchBar;

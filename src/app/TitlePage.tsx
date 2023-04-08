import { z } from "zod";
import { env } from "~/env.mjs";

const TitleSchema = z.object({
	Title: z.string(),
	Year: z.string(),
	Rated: z.string(),
	Released: z.string(),
	Runtime: z.string(),
	Genre: z.string(),
	Director: z.string(),
	Writer: z.string(),
	Actors: z.string(),
	Plot: z.string(),
	Language: z.string(),
	Country: z.string(),
	Awards: z.string(),
	Poster: z.string().url(),
	Ratings: z
		.object({
			Source: z.string(),
			Value: z.string(),
		})
		.array(),
	Metascore: z.string(),
	imdbRating: z.string(),
	imdbVotes: z.string(),
	imdbID: z.string(),
	Type: z.string(),
	DVD: z.string(),
	BoxOffice: z.string(),
	Production: z.string(),
	Website: z.string(),
});

const getTitle = async ({ title }: { title: string }) => {
	const res = await fetch(
		`http://www.omdbapi.com/?t=${title}&apikey=${env.OMDB_KEY}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		}
	);
	const data: unknown = await res.json();
	return TitleSchema.parse(data);
};

const TitlePage = async ({ title }: { title: string }) => {
	const titleData = await getTitle({ title });
	return (
		<div className="m-8 w-full flex-1 rounded-lg bg-white p-4 shadow-lg">
			{titleData.Title}
		</div>
	);
};

export default TitlePage;

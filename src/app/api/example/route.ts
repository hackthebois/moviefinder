import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const SearchSchema = z.object({ query: z.string() });

export const GET = () => {
	return NextResponse.json({ example: "This is an example get request" });
};

export const POST = async (request: Request) => {
	const reqBody: unknown = await request.json();

	const { query } = SearchSchema.parse(reqBody);

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: findMoviesPrompt(query),
		temperature: 0.6,
		max_tokens: 100,
	});
	console.log(response.data.choices[0]?.text?.split("$"));
	return NextResponse.json(responseToObject(response.data.choices[0]?.text));
};

function findMoviesPrompt(description: String) {
	return `"You are a movie and tv show search engine. 
	I will enter a prompt and you respond with 5 movies 
	or tv shows related to the prompt. The Prompt should be 
	a JSON list of items including each movies name the release 
	year, and short description (10 words max,5 words min). Do not include spacing 
	in text response. Make sure every movie reponse is enclosed by $, eg 
	Movie1: $Bad Guy$1999$Movie about bad Guys$Good Guy$1999$Movie about Good Guys$ The prompt is ${description}."`;
}

function responseToObject(response: String) {
	const lst = response.split("$");

	let responseObject = [];

	let i = 1;
	while (i < lst.length) {
		let name = lst[i++];
		let releaseYear = lst[i++];
		let description = lst[i++];

		responseObject.push({
			name: name,
			releaseYear: releaseYear,
			description: description,
		});
	}

	return responseObject;
}

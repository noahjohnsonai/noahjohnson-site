// Raw markdown endpoint for take-home example files. Serves the .md body so
// readers can download or curl the file directly. Powers the "Download .md"
// button in the example page and the RightPanel.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
	const examples = await getCollection('examples');
	return examples.map((entry) => ({
		params: { slug: entry.id },
		props: { body: entry.body ?? '' },
	}));
}

export const GET: APIRoute = ({ props }) => {
	const body = (props as { body: string }).body;
	return new Response(body, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};

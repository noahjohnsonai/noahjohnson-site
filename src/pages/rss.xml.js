import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts.ts';

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => !data.draft);
	const projects = await getCollection('projects', ({ data }) => !data.draft);
	const caseStudies = await getCollection('caseStudies', ({ data }) => !data.draft);

	const items = [
		...posts.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			pubDate: p.data.pubDate,
			link: `/posts/${p.id}/`,
		})),
		...caseStudies.map((c) => ({
			title: `[Case study] ${c.data.title}`,
			description: c.data.description,
			pubDate: c.data.pubDate,
			link: `/case-studies/${c.id}/`,
		})),
		...projects.map((p) => ({
			title: `[Project] ${p.data.title}`,
			description: p.data.description,
			pubDate: p.data.pubDate,
			link: `/projects/${p.id}/`,
		})),
	].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}

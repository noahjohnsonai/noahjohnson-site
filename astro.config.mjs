// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

// Tag the article's TLDR heading + its first paragraph so Prose.astro can
// style them as a distinct summary callout. Looks for the FIRST h2 whose
// text content (trimmed, lowercased) equals "tldr".
function rehypeTldrCallout() {
	return (tree) => {
		const children = tree.children ?? [];
		for (let i = 0; i < children.length; i++) {
			const node = children[i];
			if (node.type !== 'element' || node.tagName !== 'h2') continue;
			const text = (node.children ?? [])
				.filter((c) => c.type === 'text')
				.map((c) => c.value)
				.join('')
				.trim()
				.toLowerCase();
			if (text !== 'tldr') return;  // only the first H2 is considered
			node.properties = node.properties ?? {};
			node.properties.className = [
				...(node.properties.className ?? []),
				'tldr-heading',
			];
			node.properties.id = node.properties.id ?? 'tldr';
			// Mark every node up to (but not including) the next heading as
			// part of the callout body.
			for (let j = i + 1; j < children.length; j++) {
				const next = children[j];
				if (next.type === 'element' && /^h[1-6]$/.test(next.tagName)) break;
				if (next.type === 'element') {
					next.properties = next.properties ?? {};
					next.properties.className = [
						...(next.properties.className ?? []),
						'tldr-body',
					];
				}
			}
			return;
		}
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://www.noahjohnson.ai/',
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		shikiConfig: {
			theme: 'vesper',
			wrap: false,
		},
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['noopener', 'noreferrer'],
					protocols: ['http', 'https', 'mailto'],
				},
			],
			rehypeTldrCallout,
		],
	},
});

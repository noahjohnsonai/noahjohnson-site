import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'> | CollectionEntry<'projects'>;

export async function getSortedPosts(): Promise<CollectionEntry<'posts'>[]> {
	const all = await getCollection('posts', ({ data }) => !data.draft);
	return all.sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);
}

export async function getSortedProjects(): Promise<CollectionEntry<'projects'>[]> {
	const all = await getCollection('projects', ({ data }) => !data.draft);
	return all.sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);
}

export function groupByYear<T extends PostEntry>(
	entries: T[],
): { year: number; entries: T[] }[] {
	const map = new Map<number, T[]>();
	for (const e of entries) {
		const y = e.data.pubDate.getFullYear();
		if (!map.has(y)) map.set(y, []);
		map.get(y)!.push(e);
	}
	return [...map.entries()]
		.sort((a, b) => b[0] - a[0])
		.map(([year, entries]) => ({ year, entries }));
}

export function formatRelativeDate(date: Date): string {
	const now = Date.now();
	const diff = now - date.getTime();
	const day = 24 * 60 * 60 * 1000;
	if (diff < day) return 'now';
	const d = Math.floor(diff / day);
	if (d < 7) return `${d}d`;
	if (d < 30) return `${Math.floor(d / 7)}w`;
	if (d < 365) return `${Math.floor(d / 30)}mo`;
	return `${Math.floor(d / 365)}y`;
}

export function formatAbsoluteDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function formatMonthYear(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
	});
}

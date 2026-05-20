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

export async function getSortedCaseStudies(): Promise<CollectionEntry<'caseStudies'>[]> {
	const all = await getCollection('caseStudies', ({ data }) => !data.draft);
	return all.sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);
}

// Enforce 1:1 case-study↔project mapping (plan decision row 10). Throws at
// build time if two case studies share a `project:` slug, or if a case study
// points at a non-existent project. Called from case-studies routes.
export async function assertCaseStudyInvariants(): Promise<void> {
	const [caseStudies, projects] = await Promise.all([
		getCollection('caseStudies'),
		getCollection('projects'),
	]);
	const projectIds = new Set(projects.map((p) => p.id));
	for (const cs of caseStudies) {
		const proj = cs.data.project;
		if (!projectIds.has(proj)) {
			throw new Error(
				`Case study "${cs.id}" references project "${proj}", which doesn't exist in src/content/projects/. ` +
				`Either create the project or fix the case study's frontmatter.`,
			);
		}
	}
}

// Get all case studies that reference a project slug, newest first. Multiple
// case studies per project are allowed.
export async function getCaseStudiesForProject(
	projectSlug: string,
): Promise<CollectionEntry<'caseStudies'>[]> {
	const all = await getCollection('caseStudies', ({ data }) => !data.draft);
	return all
		.filter((cs) => cs.data.project === projectSlug)
		.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export interface ResolvedExample {
	slug: string;
	title: string;
	filename: string;
	content: string;
	href: string;
}

// Scan markdown body for inline links to /examples/<slug> and return the
// referenced example entries in the order they appear. Each result includes
// the example's body so the RightPanel can render it without a network call.
// Powers the "drawer defaults to first linked example" behavior (plan
// decision row 13).
export async function getReferencedExamples(
	body: string,
): Promise<ResolvedExample[]> {
	if (!body) return [];
	// Match [text](/examples/<slug>) or [text](/examples/<slug>/) — leading
	// slash required to disambiguate from relative paths. Capture the slug.
	const re = /\]\(\/examples\/([a-z0-9-]+)\/?\)/gi;
	const slugs: string[] = [];
	const seen = new Set<string>();
	let m: RegExpExecArray | null;
	while ((m = re.exec(body)) !== null) {
		const slug = m[1];
		if (!seen.has(slug)) {
			seen.add(slug);
			slugs.push(slug);
		}
	}
	if (slugs.length === 0) return [];
	const all = await getCollection('examples');
	const byId = new Map(all.map((e) => [e.id, e]));
	const resolved: ResolvedExample[] = [];
	for (const slug of slugs) {
		const entry = byId.get(slug);
		if (!entry) continue; // silently skip dangling references
		resolved.push({
			slug,
			title: entry.data.title,
			filename: `${entry.id}.md`,
			content: entry.body ?? '',
			href: `/examples/${entry.id}/`,
		});
	}
	return resolved;
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

// Estimate reading time in minutes from a markdown body. Strips frontmatter,
// code fences, and markdown link/image syntax before counting words. Floors
// to 1 minute minimum. Uses 220 wpm — average for technical prose.
export function readingTimeMinutes(body: string): number {
	if (!body) return 1;
	const stripped = body
		.replace(/```[\s\S]*?```/g, ' ')   // fenced code blocks
		.replace(/`[^`]+`/g, ' ')          // inline code
		.replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')  // images
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links: keep text
		.replace(/^#+\s+/gm, '')           // heading markers
		.replace(/[*_>#~|-]/g, ' ');       // residual markdown punctuation
	const wordCount = stripped.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(wordCount / 220));
}

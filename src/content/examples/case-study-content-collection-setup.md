---
title: Case study content collection for Astro
description: Astro content collection setup that pairs case studies 1:1 with an existing projects collection, enforces the invariant at build time, and auto-renders cross-link chips on both sides.
pubDate: 2026-05-20
---

# Case study content collection for Astro

For Astro sites with an existing `projects` content collection that want to bolt a paired `case-studies` collection on top. The case study pairs 1:1 with a project (one case study per project, at most), the relationship is enforced at build time, and each side auto-renders a cross-link chip when the pairing exists.

## The schema (content.config.ts)

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Existing posts collection.
const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

// Existing projects collection.
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

// NEW: case studies pair 1:1 with projects via the `project` slug.
const caseStudies = defineCollection({
	loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
		project: z.string(),  // slug of the corresponding project entry
	}),
});

export const collections = { posts, projects, caseStudies };
```

## The build-time invariant

Zod schemas validate per-entry, not across entries. The 1:1 rule (no two case studies share a `project:` slug) needs to run at the collection level. Put it in a helper and call it from your case-study routes.

```typescript
// src/lib/case-studies.ts
import { getCollection, type CollectionEntry } from 'astro:content';

export async function assertCaseStudyInvariants(): Promise<void> {
	const [caseStudies, projects] = await Promise.all([
		getCollection('caseStudies'),
		getCollection('projects'),
	]);
	const projectIds = new Set(projects.map((p) => p.id));
	const seen = new Map<string, string>();
	for (const cs of caseStudies) {
		const proj = cs.data.project;
		if (!projectIds.has(proj)) {
			throw new Error(
				`Case study "${cs.id}" references project "${proj}", which doesn't exist. ` +
				`Either create the project or fix the case study's frontmatter.`,
			);
		}
		const prev = seen.get(proj);
		if (prev) {
			throw new Error(
				`Two case studies reference the same project "${proj}": "${prev}" and "${cs.id}". ` +
				`Case studies must be 1:1 with projects.`,
			);
		}
		seen.set(proj, cs.id);
	}
}

export async function getCaseStudyForProject(
	projectSlug: string,
): Promise<CollectionEntry<'caseStudies'> | null> {
	const all = await getCollection('caseStudies', ({ data }) => !data.draft);
	return all.find((cs) => cs.data.project === projectSlug) ?? null;
}
```

## The routes

Two new routes. The index lists all case studies; the per-slug page renders one.

```astro
---
// src/pages/case-studies/index.astro
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';
import { assertCaseStudyInvariants } from '../../lib/case-studies';

await assertCaseStudyInvariants();
const entries = (await getCollection('caseStudies', ({ data }) => !data.draft))
	.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
---

<Layout title="Case Studies">
	<h1>Case Studies</h1>
	{entries.length === 0
		? <p>No case studies yet.</p>
		: <ul>{entries.map(e => <li><a href={`/case-studies/${e.id}/`}>{e.data.title}</a></li>)}</ul>
	}
</Layout>
```

```astro
---
// src/pages/case-studies/[...slug].astro
import { getCollection, render } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import { assertCaseStudyInvariants } from '../../lib/case-studies';

export async function getStaticPaths() {
	await assertCaseStudyInvariants();
	const studies = await getCollection('caseStudies', ({ data }) => !data.draft);
	return studies.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<Layout title={entry.data.title}>
	<article>
		<h1>{entry.data.title}</h1>
		<Content />
		<p>Paired with project: <a href={`/projects/${entry.data.project}/`}>{entry.data.project}</a></p>
	</article>
</Layout>
```

## The cross-link chip on the project page

Add a chip to your existing project page that renders only when a case study exists for the project.

```astro
---
// src/pages/projects/[...slug].astro (additions)
import { getCaseStudyForProject } from '../../lib/case-studies';

// ...existing getStaticPaths and entry rendering...

const caseStudy = await getCaseStudyForProject(entry.id);
---

{caseStudy && (
	<a href={`/case-studies/${caseStudy.id}/`} class="case-study-chip">
		Read the case study: {caseStudy.data.title}
	</a>
)}
```

Style the chip however fits your site. The rendering is conditional on the case study existing, so it'll appear automatically the moment a paired case study is published.

## What you get

- A new content collection that knows about its relationship to an existing one.
- A hard build-time check that catches two-case-studies-for-one-project errors before deploy.
- Auto-rendered cross-links in both directions, with zero manual frontmatter on the project side.
- A canonical URL pattern (`/case-studies/<slug>/`) that mirrors `/projects/<slug>/`.

## What's deliberately not in here

- A `caseStudies` field on the project schema. The case study points at the project; the project doesn't need to know about the case study. Single source of truth.
- A pubDate-sort-by-project-pubDate option. Case studies sort by their own pubDate, not by the project's.
- A second case study slot per project. The 1:1 rule is load-bearing. If you find yourself wanting two, the case study probably needs to be split into a case study + a separate post.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	draft: z.boolean().default(false),
	featured: z.boolean().default(false),
});

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: postSchema,
});

const projectSchema = postSchema.extend({
	skills: z.array(z.string()).default([]),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: projectSchema,
});

const about = defineCollection({
	loader: glob({ base: './src/content/about', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string().default('About'),
		description: z.string().optional(),
	}),
});

// Case studies: 1:1 with projects. `project` is the slug of the corresponding
// project under src/content/projects/. Build-time uniqueness is enforced in
// src/lib/data.ts via assertUniqueCaseStudyProjects(), called from the
// case-studies routes.
const caseStudySchema = postSchema.extend({
	project: z.string(),
});

const caseStudies = defineCollection({
	loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
	schema: caseStudySchema,
});

// Examples: generalized take-home .md files referenced from articles and case
// studies. Linked inline by article authors; the RightPanel detects those
// links and swaps drawer content on click. Files are always generalized — no
// project-specific names, no client identifiers (plan decision row 15).
const exampleSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	pubDate: z.coerce.date().optional(),
});

const examples = defineCollection({
	loader: glob({ base: './src/content/examples', pattern: '**/*.{md,mdx}' }),
	schema: exampleSchema,
});

export const collections = { posts, projects, about, caseStudies, examples };

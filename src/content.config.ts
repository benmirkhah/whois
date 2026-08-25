import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { url } from 'astro:schema';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const project = defineCollection({
	loader: glob({ base: './src/content/project', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			type: z.string(),
			name: z.string(),
			logo: z.optional(image()),
			title: z.string(),
			company: z.string(),
			url: z.optional(url()),
			year: z.int(),
			description: z.string(),
			tags: z.array(z.string()),
		}),
});

export const collections = { blog, project };

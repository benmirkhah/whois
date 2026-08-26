import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { url } from 'astro:schema';
import { z } from 'astro/zod';

//BLOGS
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

//COMPANIES
const company = defineCollection({
	loader: glob({ base: './src/content/company', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			status: z.enum(["active", "inactive", "forgotten"]).default("active"),
			name: z.string(),
			logo: z.optional(image()),
			url: z.optional(url()),
			est: z.int().optional(),
			tags: z.string(),
			//tags: z.array(z.string()),
		}),
});

//PROJECTS
const project = defineCollection({
	loader: glob({ base: './src/content/project', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			type: z.string(),
			name: z.string().min(2),
			title: z.string(),
			company: reference("company"),
			url: z.optional(url()),
			year: z.coerce.number(),
			slide: z.optional(image()),
			description: z.string(),
			related: reference("project").optional(),
			tags: z.string(),
			//tags: z.array(z.string()),
		}),
});

export const collections = { blog, company, project };

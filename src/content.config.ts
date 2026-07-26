import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { readdirSync } from 'node:fs';

const ILLUSTRATIONS = readdirSync('public/illustrations')
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace(/\.svg$/, ''));

const illustration = z.string().refine(
  (name) => ILLUSTRATIONS.includes(name),
  (name) => ({ message: `Unknown illustration "${name}" — must match a file in public/illustrations/` }),
);

const pieceSchema = z.object({
  title: z.string(),
  sub: z.string().optional(),
  excerpt: z.string(),
  illustration,
  tailpiece: illustration.optional(),
  year: z.number().int(),
  order: z.number().int(),
});

const dirSlug = (suffix: string) => ({ entry }: { entry: string }) => entry.replace(suffix, '');

const poems = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './content/poems', generateId: dirSlug('/index.md') }),
  schema: pieceSchema.extend({
    // "the long tellings" (narrative praise-songs) vs "the short breaths" (lyrics)
    family: z.enum(['telling', 'breath']).default('breath'),
    // Optional quoted epigraph above the poem. Use a YAML block scalar (|) for
    // multiple lines; epigraphSource renders as the attribution beneath.
    epigraph: z.string().optional(),
    epigraphSource: z.string().optional(),
    // Two lines shown when this poem is hung on its family page wall (6c).
    // Optional: falls back to the poem's first two lines. Use a block scalar (|).
    couplet: z.string().optional(),
  }),
});

const poemNotes = defineCollection({
  loader: glob({ pattern: '*/note.md', base: './content/poems', generateId: dirSlug('/note.md') }),
});

const writings = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './content/writings', generateId: dirSlug('/index.md') }),
  schema: pieceSchema.extend({ signoff: z.string().optional() }),
});

const writingNotes = defineCollection({
  loader: glob({ pattern: '*/note.md', base: './content/writings', generateId: dirSlug('/note.md') }),
});

const books = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './content/books', generateId: dirSlug('.yaml') }),
  schema: z.object({
    title: z.string(),
    coverLines: z.array(z.string()),
    sub: z.string(),
    excerpt: z.string(),
    year: z.number().int(),
    illustration,
    lede: z.string(),
    body: z.string(),
    stores: z.array(z.object({ label: z.string(), href: z.string().url() })),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'bio.md', base: './content/about', generateId: () => 'bio' }),
  schema: z.object({ lede: z.string(), motto: z.string(), thread: z.string() }),
});

const selectedWorks = defineCollection({
  loader: glob({ pattern: 'selected-works.yaml', base: './content/about', generateId: () => 'selected-works' }),
  schema: z.object({
    groups: z.array(
      z.object({
        group: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            italic: z.boolean().optional(),
            sub: z.string().nullable().optional(),
            links: z.array(z.object({ label: z.string(), href: z.string().url() })),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { poems, poemNotes, writings, writingNotes, books, about, selectedWorks };

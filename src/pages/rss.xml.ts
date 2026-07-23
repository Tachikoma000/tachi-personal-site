import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const poems = await getCollection('poems');
  const writings = await getCollection('writings');
  const books = await getCollection('books');

  const items = [
    ...poems.map((p) => ({
      title: p.data.title,
      description: p.data.excerpt,
      link: withBase(`/poems/${p.id}/`),
      pubDate: new Date(Date.UTC(p.data.year, 0, 1)),
    })),
    ...writings.map((w) => ({
      title: w.data.title,
      description: w.data.excerpt,
      link: withBase(`/writings/${w.id}/`),
      pubDate: new Date(Date.UTC(w.data.year, 0, 1)),
    })),
    ...books.map((b) => ({
      title: b.data.title,
      description: b.data.excerpt,
      link: withBase(`/books/${b.id}/`),
      pubDate: new Date(Date.UTC(b.data.year, 0, 1)),
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'tachi',
    description: 'writings · poems · musings · beauty',
    site: context.site!,
    items,
  });
}

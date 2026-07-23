import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tachikoma000.github.io',
  base: '/tachi-personal-site',
  integrations: [sitemap()],
  // The handoff mandates verbatim copy: what the author types is what renders.
  // SmartyPants would silently curl straight apostrophes/quotes in essays and notes.
  markdown: { smartypants: false },
});

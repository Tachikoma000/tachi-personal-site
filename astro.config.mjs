import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tachikoma000.github.io',
  base: '/tachi-personal-site',
  integrations: [sitemap()],
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://windsurf-rules.pages.dev',
  base: '/',
  output: 'static',

  build: {
    assets: 'assets'
  },

  integrations: [tailwind()]
});
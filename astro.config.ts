import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  build: {
    assets: 'assets',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon({
      include: { 'fa6-brands': ['github', 'orcid', 'bilibili', 'discord'] },
    }),
  ],
});

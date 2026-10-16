import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://grupoabr.com.br',
  output: 'static',
  build: { format: 'directory' }
});

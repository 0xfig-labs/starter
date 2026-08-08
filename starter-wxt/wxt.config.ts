import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'WXT React Starter',
    description: 'A minimal WXT browser extension starter.',
    permissions: [],
    host_permissions: ['https://example.com/*'],
  },
});

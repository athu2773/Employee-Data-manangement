// Converted from vite.config.ts to ESM
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		// Ensure lucide-react is pre-bundled so runtime requests to
		// node_modules ESM files (which ad-blockers may flag) don't occur.
		include: ['lucide-react'],
	},
});

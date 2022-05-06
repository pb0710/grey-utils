import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'chunk',
			fileName: format => `chunk.${format}.js`
		},
		sourcemap: true
	}
})

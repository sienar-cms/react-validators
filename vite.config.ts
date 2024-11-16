import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: {
				'sienar-react-validators': './src/index.ts'
			},
			formats: [ 'es' ]
		}
	},
	plugins: [
		dts({
			rollupTypes: true,
			tsconfigPath: './tsconfig.app.json'
		})
	]
});

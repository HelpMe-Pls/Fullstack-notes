import path from 'node:path'
import { fileURLToPath } from 'node:url'
import esbuild from 'esbuild'
import fsExtra from 'fs-extra'
import { globSync } from 'glob'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const here = (...s: Array<string>) => path.join(__dirname, ...s)
const globsafe = (s: string) => s.replace(/\\/g, '/')

// First, ensure server-build directory exists
fsExtra.ensureDirSync(here('../server-build'))

// Copy all non-TypeScript/JavaScript files
const allFiles = globSync(globsafe(here('../server/**/*.*')), {
	ignore: [
		'server/dev-server.js', // for development only
		'**/tsconfig.json',
		'**/eslint*',
		'**/__tests__/**',
	],
})

for (const file of allFiles) {
	if (!/\.(ts|js|tsx|jsx)$/.test(file)) {
		const dest = file.replace(here('../server'), here('../server-build'))
		fsExtra.ensureDirSync(path.parse(dest).dir)
		fsExtra.copySync(file, dest)
		console.log(`copied: ${file.replace(`${here('../server')}/`, '')}`)
	}
}

// Get all TypeScript/JavaScript files for building
const sourceFiles = globSync(globsafe(here('../server/**/*.{ts,js,tsx,jsx}')), {
	ignore: [
		'server/dev-server.js',
		'**/tsconfig.json',
		'**/eslint*',
		'**/__tests__/**',
	],
})

console.log()
console.log('Building server files...')
console.log('Entry points:', sourceFiles)

// Build the server files
esbuild
	.build({
		entryPoints: sourceFiles,
		outdir: here('../server-build'),
		target: ['esnext'],
		platform: 'node',
		sourcemap: true,
		format: 'esm',
		logLevel: 'info',
		bundle: true,
		outbase: here('../server'),
	})
	.then(() => {
		console.log('Build completed successfully')
		// Verify the build output
		const buildFiles = globSync(globsafe(here('../server-build/**/*.js')))
		console.log('Build output files:', buildFiles)
	})
	.catch((error: unknown) => {
		console.error('Build failed:', error)
		process.exit(1)
	})

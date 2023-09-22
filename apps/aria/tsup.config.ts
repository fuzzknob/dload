import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['start.ts'],
  treeshake: true,
  minify: true,
  ...options,
}))


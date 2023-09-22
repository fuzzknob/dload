import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/main.ts'],
  treeshake: true,
  minify: true,
  ...options,
}))


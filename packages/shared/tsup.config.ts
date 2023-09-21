import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/**/*.ts'],
  format: ['esm', 'cjs'],
  splitting: true,
  dts: true,
  treeshake: true,
  minify: true,
  clean: true,
  ...options,
}))

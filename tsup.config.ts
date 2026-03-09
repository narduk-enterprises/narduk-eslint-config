import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  splitting: false,
  sourcemap: true,
  target: 'node18',
  outDir: 'dist',
  onSuccess: async () => {
    // Copy spec JSON files to dist so spec-loader can find them at runtime
    const specDir = join('dist', 'spec');
    mkdirSync(specDir, { recursive: true });
    copyFileSync('src/rules/spec/nuxt4-spec.json', join(specDir, 'nuxt4-spec.json'));
    copyFileSync('src/rules/spec/nuxt-ui-v4.json', join(specDir, 'nuxt-ui-v4.json'));
    console.log('✓ Spec files copied to dist/spec/');
  },
});

# Memory Bank: @hyperbitjs/rpc

## Identity
- Path: `rpc`
- Type: Project
- Package name: `@hyperbitjs/rpc`

## Primary Commands
- `npm run clean` -> `node -e "require('fs').rmSync('dist',{recursive:true,force:true})"`
- `npm run build` -> `vite build`
- `npm run prebuild` -> `npm run clean`
- `npm run test` -> `vitest --run`
- `npm run test:watch` -> `vitest`
- `npm run lint` -> `eslint .`
- `npm run lint:fix` -> `eslint . --fix && prettier --write .`
- `npm run format` -> `prettier --write .`
- `npm run type-check` -> `tsc --noEmit`

## Runtime and Config
- Main entry hint: `dist/index.cjs`
- Module entry hint: `dist/index.mjs`
- Types entry hint: `dist/index.d.ts`
- Env template: `.env.example`

## Dependency Surface
- Prod deps count: 1
- Dev deps count: 7

## LLM Working Notes
- Keep edits minimal and localized by module responsibility.
- Validate with the smallest relevant script first, then broader checks.
- Record any non-obvious behavior changes in this file.

## Troubleshooting Checklist
- Confirm dependencies installed in this folder.
- Confirm expected environment variables are present.
- Run the nearest build/test/lint script and capture the exact error output.
- Verify relative paths from this package root, not workspace root.

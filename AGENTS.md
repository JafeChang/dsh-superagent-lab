# Repository instructions for coding agents

- No runtime dependencies and no dev dependencies. Tests run with `node --test` on Node 22+.
- Everything is ESM (`.js` files with `import` / `export`), CommonJS is not used.
- Keep a change as small as the request asks for. Do not reformat unrelated files.
- Before a change is ready, `node --test` must pass, and any new behaviour needs a test that shows it.
- A pull request body names the Issue it resolves with `Fixes #N`, so merging it closes the Issue, and shows the command you ran and its result.
- Do not commit generated files or change `package.json` scripts.

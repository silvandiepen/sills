# Sills website

`web` is a Vue 3, TypeScript, and Vite website for Sills. It imports `web/docs` as the canonical Markdown content source, renders a product-style homepage, and keeps documentation pages available through Vue Router.

The build output is written to `web/public` for Cloudflare Pages. `web/static/_redirects` keeps direct documentation URLs working as SPA routes.

```bash
npm run dev --workspace web
npm run build --workspace web
```

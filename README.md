# courtneyanton.com

The marketing site for [Courtney Anton Photography](https://www.courtneyanton.com).

## Stack

- **[Astro 5](https://astro.build)** — static site generator
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling
- **[TinaCMS](https://tina.io)** — git-based content editor at `/admin`
- **[Web3Forms](https://web3forms.com)** — contact form delivery
- Hosted on **GitHub Pages** with custom domain

All content lives in the repo under [`content/`](content/) (JSON + Markdown).
Photos live in [`public/uploads/`](public/uploads/) and are committed to git. Courtney edits
both through Tina's admin UI — see [ONBOARDING.md](ONBOARDING.md).

## Local development

```bash
npm install
npm run dev         # Astro only — fastest for code work
npm run dev:cms     # Astro + Tina admin (visit /admin/index.html)
npm run build       # Production build to dist/
npm run preview     # Serve the built dist/
```

The Tina admin runs at `http://localhost:4321/admin/index.html` when using `dev:cms`.
No Tina Cloud credentials are required for local dev — edits write directly to the
local filesystem.

## Production environment

Two env vars are needed at deploy time (see [`.env.example`](.env.example)):

- `PUBLIC_WEB3FORMS_KEY` — access key from web3forms.com
- `TINA_TOKEN` + `NEXT_PUBLIC_TINA_CLIENT_ID` — from app.tina.io, only needed when
  building the production Tina admin SPA

## Deploy

GitHub Actions workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
Currently set to manual trigger (`workflow_dispatch`) until DNS cutover.
After cutover, uncomment the `push: branches: [main]` trigger and Tina's
saves-to-main will auto-deploy.

## Content model

See [`tina/config.ts`](tina/config.ts) for the source of truth. Summary:

| Type          | Storage                                   | Notes                                |
| ------------- | ----------------------------------------- | ------------------------------------ |
| Site Settings | `content/settings/site.json`              | Singleton                            |
| Home          | `content/pages/home.json`                 | Singleton                            |
| About         | `content/pages/about.json`                | Singleton                            |
| Contact       | `content/pages/contact.json`              | Singleton + FAQs                     |
| Galleries     | `content/galleries/*.md`                  | Collection. Body = description       |
| Packages      | `content/packages/*.md`                   | Collection. Standard + special tiers |
| Testimonials  | `content/testimonials/*.md`               | Collection                           |

## Bulk image optimization

After dropping in a large batch of new photos, run:

```bash
node scripts/optimize-images.mjs
```

Resizes to 2400px max width, re-encodes JPEGs at quality 82 with mozjpeg. In-place.

## Repo layout

```
content/         Content files edited via Tina
public/uploads/  Photos uploaded via Tina (committed to git)
src/
  components/    Astro components (Header, Footer, HeroSlider, GalleryCard, etc.)
  layouts/       Base layout
  lib/           Content loaders
  pages/         Routes
  styles/        Global CSS + Tailwind theme tokens
tina/            Tina schema + generated files
scripts/         One-shot maintenance scripts
_seed/           Original scraped content from previous live site (reference only)
ONBOARDING.md    Courtney's editor guide
```

# Phantom Logistics

Marketing site for Phantom Logistics — a cinematic, motion-driven freight & logistics site built with the Next.js App Router.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **GSAP** (ScrollTrigger, SplitText) + **Lenis** smooth scroll for scroll-driven animation
- **Framer Motion** for component-level interactions
- Fonts via `next/font` (Teko, Manrope, JetBrains Mono)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build locally   |

## Project structure

```
src/
  app/        # routes: / , /about , /why , /services , /services/[slug] , /contact
              # + robots.ts, sitemap.ts, layout.tsx, globals.css
  components/ # Nav, Footer, Hero, page sections, ui/ primitives
  styles/     # per-page stylesheets (about.css, why.css, contact.css, …)
  lib/        # gsap setup, utils
  hooks/      # shared hooks
  data/       # services content
public/       # imagery and static assets
```

## Deploying to Vercel

This is a standard Next.js app — Vercel auto-detects the framework, build command (`next build`), and output. No `vercel.json` is required.

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/new), **Import** the GitHub repository.
3. Keep the defaults (Framework preset: **Next.js**) and click **Deploy**.

There are no required environment variables.

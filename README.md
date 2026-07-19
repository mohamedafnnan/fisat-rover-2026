# FISAT Rover Website 2026

Official website foundation for the FISAT Rover Team.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · React Three Fiber · Drei · Rapier · GSAP · Lucide · Zustand · next-themes

## Principles

- Server Components by default; client islands only for interactivity
- Mobile-first, accessibility-first, Lighthouse 95+
- Design-token driven (light/dark)
- 3D world is an **opt-in isolated island** at `/explore`
- Content pages are shells in this milestone — no full page content yet

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript `--noEmit` |
| `npm run format` | Prettier write |

## Folder map

```
src/
  app/
    (marketing)/     # Public IA routes + chrome layout
    (world)/explore  # Opt-in Base Camp island
    search/          # Global search shell
    api/             # Future route handlers
  components/
    ui/              # Design-system primitives
    layout/          # Header, footer, nav
    sections/        # Page section blocks
    feedback/        # Empty / error states
    providers/       # Theme + toast
  world/             # R3F isolation boundary
  config/            # Site + nav config
  lib/               # utils, seo, animation, cms stubs
  hooks/
  store/             # Zustand (ui + world only)
  styles/tokens.css  # Design tokens
  types/
```

## Architecture references

This foundation implements:

- Information Architecture routes
- Design System tokens + primitives
- UX chrome (nav, footer, loading, error, 404)
- Frontend architecture boundaries (RSC default, world isolation)
- SEO metadata, sitemap, robots

## Next milestones

1. Home page sections (non-3D)
2. Domain components (ProjectCard, TeamCard, ResearchCard, …)
3. CMS (Payload) integration
4. Full Base Camp world
5. Forms (Join / Contact / Sponsor)

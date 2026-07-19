# Foundation Milestone — Complete

**Status:** Production build green · Typecheck green · 36 routes generated  
**Location:** `/home/user/fisat-rover`  
**Archive:** `fisat-rover-foundation.tar.gz`

## Verified

| Check | Result |
| --- | --- |
| `tsc --noEmit` | Pass |
| `next build` | Pass (Next.js 15.5.7) |
| Shared First Load JS | **102 kB** |
| Marketing pages | **106 kB** first load |
| `/explore` island | **118 kB** first load (lazy R3F) |
| Static routes | 30+ prerendered |
| API stubs | contact, apply, newsletter, revalidate, search |

## Delivered (requirements map)

1. **Folder structure** — App Router groups `(marketing)` / `(world)`, components, world, lib, hooks, store, types  
2. **Routing** — Full IA sitemap as real routes (content shells only)  
3. **Global layout** — Root fonts/providers + marketing chrome layout  
4. **Navbar** — Sticky, condensing, hide-on-down; desktop mega-menu; mobile dialog; Join + Sponsor Us  
5. **Footer** — 4-column IA footer + legal base bar  
6. **Theme system** — `next-themes` + CSS variable tokens + ThemeToggle  
7. **Typography** — Inter + JetBrains Mono via `next/font`; fluid type scale utilities  
8. **Color system** — Semantic light/dark tokens (primary, mars, status, surfaces)  
9. **Design tokens** — `src/styles/tokens.css` → Tailwind v4 `@theme inline`  
10. **UI primitives** — Button, Badge, Input, Label, Separator, Skeleton, Card, Container (CVA + Radix)  
11. **Global animations** — CSS keyframes + reduced-motion collapse; GSAP lazy helpers  
12. **Utilities** — `cn`, `absoluteUrl`, `formatDate`, SEO builders, capability probe  
13. **Loading UI** — `app/loading.tsx` skeleton  
14. **Error UI** — `error.tsx`, `global-error.tsx`, `ErrorState` component  
15. **404** — Branded `not-found.tsx` with suggestions  
16. **SEO** — `buildMetadata`, Organization + WebSite JSON-LD  
17. **Metadata** — Per-route metadata on all shells  
18. **Fonts** — `next/font` Inter + JetBrains Mono, CSS variables  
19. **Breakpoints** — sm/md/lg/xl/2xl (640→1536) in theme + `siteConfig`  
20. **Project config** — package.json, tsconfig (strict), next.config, eslint, prettier, components.json, env example, middleware, sitemap, robots  

## Architecture guarantees baked in

- **RSC by default** — client only for nav, theme, world, toasts  
- **World isolation** — `/world` + `/explore`; R3F dynamic `ssr:false`; capability gate  
- **A11y** — skip link, focus rings, dialog focus trap, `aria-current`, reduced-motion  
- **Performance** — `optimizePackageImports`, image formats, no Three.js on marketing bundles  
- **CMS-ready** — `lib/cms` stub; nav/config shaped for Payload globals later  

## Not in this milestone (by design)

- Full page content / sections  
- Payload CMS wiring  
- Domain cards (Team/Project/Research/Sponsor)  
- Full Base Camp world (Rapier/GSAP camera systems reserved)  
- Real form backends / search index  

## Run

```bash
cd fisat-rover
cp .env.example .env.local
npm install
npm run dev
```

## Next recommended milestones

1. Home page sections (non-3D) + domain components  
2. Payload collections + fetchers + ISR tags  
3. Join / Contact / Sponsor forms  
4. Engineering docs shell + search  
5. Base Camp world build-out  

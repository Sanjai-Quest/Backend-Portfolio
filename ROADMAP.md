# Roadmap

Each phase ends with a deployment. Nothing moves to the next phase with a broken build.

Content ratio (see `PROJECT_PRINCIPLES.md` #17): ~65-70% real work, ~30-35% backend-concept showcase. Phases 3, 4, 6 are work pages — concept flavor there stays limited to chrome. Phase 5 is where concept-showcase content is allowed to dominate.

- [x] **Phase 1 — Foundation**: Vite + React + TS + Tailwind v4 + Framer Motion + React Router, global shell (header/nav/footer), design tokens, routing skeleton. Deployed.
- [ ] **Phase 2 — Design system**: EndpointChip (done early, phase 1), Primary/Secondary Button, Status Badge, Technology Badge, Request Packet, Terminal Log, Service Card, Section Header, Info Card, Timeline, loading states.
- [ ] **Phase 3 — Home** *(work page)*: hero, featured projects shown prominently and early — a visitor should see real project cards before any backend-concept flourish. Request animation and similar chrome are accents, not the opening content.
- [ ] **Phase 4 — About + Projects** *(work pages)*: real content, project data (static JSON or GitHub API). Full project detail — this is the highest-work-density part of the site.
- [ ] **Phase 5 — Architecture** *(concept-showcase page)*: React Flow topology graph, simulated Redis cache-hit/miss and Kafka event-pipeline animations. Every animation pairs with a plain-English caption per `PROJECT_PRINCIPLES.md` #16 — this is the page where jargon density is highest, so the translation layer matters most here. This page is where concept content is allowed to dominate — it doesn't need to defer to the ratio.
- [ ] **Phase 6 — Contact** *(work page)*: Cloudflare Pages Function + Resend (or Formspree) for real email delivery. No message broker.
- [ ] **Phase 7 — Polish**: accessibility audit, SEO, Lighthouse pass, responsive fixes, animation tuning, bundle size check. Includes a final content-ratio check — confirm work pages didn't accumulate concept-heavy additions during build.

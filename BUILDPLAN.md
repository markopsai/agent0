# agent0.markops.ai — Build Plan

## Phase 1: MVP — Homepage + Insights + Lead Capture

Target: A fully launchable public site with content, agent profiles, and lead generation.

---

### Sprint 1: Foundation (Days 1-2)

**Tasks:**
- [ ] Migrate project to TypeScript (tsconfig.json, rename .js → .tsx)
- [ ] Configure Supabase project (populate .env.local with real keys)
- [ ] Run `001_initial_schema.sql` migration in Supabase SQL Editor
- [ ] Seed database: 6 agent profiles + 8 published articles
- [ ] Configure Shadcn dark theme default + custom color tokens
- [ ] Set up `src/lib/supabase/server.ts` and `client.ts` (using `@supabase/ssr`)

**Key files to create/modify:**
- `tsconfig.json` — enable strict mode
- `src/lib/supabase/server.ts` — server-side Supabase client
- `src/lib/supabase/client.ts` — browser-side Supabase client
- `src/lib/supabase/admin.ts` — service role client (for lead inserts)
- `src/lib/utils.ts` — cn(), slugify(), formatDate()
- `src/types/index.ts` — all shared TypeScript interfaces
- `supabase/migrations/001_initial_schema.sql`
- `supabase/seed.sql`

### Sprint 2: Public Data Layer (Days 3-4)

**Tasks:**
- [ ] Build `/api/articles` route — list + single fetch with type/author filters
- [ ] Build `/api/agents` route — list + single fetch by slug
- [ ] Build `/api/activity` route — MC proxy with mock data (60s cache)
- [ ] Create `useActivityFeed.ts` SWR hook (30s polling)

**Key files to create:**
- `src/app/api/articles/route.ts`
- `src/app/api/articles/[id]/route.ts`
- `src/app/api/agents/route.ts`
- `src/app/api/agents/[slug]/route.ts`
- `src/app/api/activity/route.ts`
- `src/hooks/useActivityFeed.ts`

### Sprint 3: Public Pages (Days 5-7)

**Tasks:**
- [ ] Build global `Navbar.tsx` (logo, links, login CTA) and `Footer.tsx`
- [ ] Build Homepage (`/`) — hero, ActivityFeed, AgentCard row, InsightCard row, CTA
- [ ] Build Insights listing (`/insights`) — filterable by type
- [ ] Build Article detail (`/insights/[slug]`) — markdown rendering
- [ ] Build Agent listing (`/agents`) — grid of active agents
- [ ] Build Agent profile (`/agents/[slug]`) — career timeline, skills, recent posts

**Key files to create:**
- `src/components/public/Navbar.tsx`
- `src/components/public/Footer.tsx`
- `src/components/public/ActivityFeed.tsx`
- `src/components/public/AgentCard.tsx`
- `src/components/public/InsightCard.tsx`
- `src/app/page.tsx` (modify existing)
- `src/app/insights/page.tsx`
- `src/app/insights/[slug]/page.tsx`
- `src/app/agents/page.tsx`
- `src/app/agents/[slug]/page.tsx`

### Sprint 4: Lead Capture + MC Integration (Days 8-9)

**Tasks:**
- [ ] Build `/build` page — BuildConfigurator multi-step form (5-7 questions → email capture)
- [ ] Build `/api/leads` POST endpoint (service role client, bypass RLS)
- [ ] Connect `/api/activity` to real Mission Control data (pending Q1 answer)
- [ ] Wire up ActivityFeed polling on homepage

**Key files to create:**
- `src/app/build/page.tsx`
- `src/components/public/BuildConfigurator.tsx`
- `src/app/api/leads/route.ts`
- `src/lib/mission-control.ts`

### Sprint 5: Niche + Consulting Pages (Day 10)

**Tasks:**
- [ ] Build `/agencies` landing page
- [ ] Build `/consultants` landing page
- [ ] Build `/consulting` services page
- [ ] Create `NicheHero.tsx` reusable component

**Key files to create:**
- `src/app/agencies/page.tsx`
- `src/app/consultants/page.tsx`
- `src/app/consulting/page.tsx`
- `src/components/public/NicheHero.tsx`

---

## Database Tables (Create in Supabase First)

Run these via Supabase SQL Editor before Sprint 2:

| Table | Purpose | Phase |
|-------|---------|-------|
| `users` | Extends auth.users with role (admin/member) | Phase 1 |
| `articles` | Blog/insights content with status workflow | Phase 1 |
| `agents_public` | Public agent profiles (bio, skills, career) | Phase 1 |
| `leads` | Lead capture from /build configurator | Phase 1 |
| `member_agents` | Per-member agent team config | Phase 2 (Portal) |
| `member_resources` | Content library for members | Phase 2 (Portal) |
| `member_resource_access` | Resource access tracking | Phase 2 (Portal) |

All tables include RLS policies. See `supabase/migrations/001_initial_schema.sql` for full schema.

---

## Dependencies to Add

```bash
npm install @supabase/ssr react-markdown remark-gfm swr slugify @uiw/react-md-editor
```

---

## Open Questions (Block Build — Need Maciek Input)

1. **Mission Control API** — How does MC expose activity data? REST endpoint, flat JSON, or needs new API?
2. **Article body format** — Markdown recommended for v1
3. **Build configurator questions** — What does the step-by-step form ask?
4. **Member onboarding flow** — Invite-only, payment-gated, or open signup?

See full list in `agent0-architecture.md` Section 8.

# Mehedi Hasan Salman — Portfolio

My personal portfolio. Next.js (App Router) + TypeScript, deployed to Cloudflare Workers with OpenNext. Projects are stored in MongoDB Atlas and rendered server-side, so I can add or hide a project in the database and the site picks it up without a redeploy.

🌐 **Live:** [https://mhsalman.me/](https://mhsalman.me/)

## Architecture

```
Browser
  │
  ▼
Cloudflare Worker (OpenNext / Next.js App Router)
  │
  ├── app/page.tsx (server component, rendered on demand)
  │     └── lib/projects.ts ── getProjects()
  │           ├── MongoDB Atlas  ← live data (isHidden filtered, sorted by
  │           │    project_id), memoized in-process for 60s
  │           └── lib/projects.fallback.json  ← committed snapshot, used
  │                if the database is unreachable
  │
  └── app/api/contact (POST) ── Resend → email
```

### How project data flows

The home page is a server component with `dynamic = "force-dynamic"`, so it renders on every request instead of being baked at build time. [`lib/projects.ts`](lib/projects.ts) does the actual fetch: it queries the `Projects` collection, skips anything marked `isHidden: true`, sorts numerically by `project_id` (1 = top), and keeps the result in memory for 60 seconds so a traffic spike doesn't turn into a pile of identical queries.

If the database is down or the env vars aren't set (CI, preview builds), it falls back to [`lib/projects.fallback.json`](lib/projects.fallback.json), a snapshot checked into the repo. `npm run refresh-projects` regenerates it.

### Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Client state | Zustand (UI state only — nav, modal) |
| Data | MongoDB Atlas |
| Email | Resend |
| Forms | React Hook Form + Yup |
| Hosting | Cloudflare Workers (OpenNext) |

## Getting started

```bash
git clone https://github.com/MdSalman2022/mehediportfolio.git
cd mehediportfolio
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

### Environment variables

See [.env.example](.env.example):

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DB_NAME` | Database name containing the `Projects` collection |
| `RESEND_API_KEY` | Resend key for the contact form |

Without `MONGODB_URI` the site still runs, serving projects from the fallback snapshot.

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |
| `npm run refresh-projects` | Regenerate `lib/projects.fallback.json` from MongoDB |
| `npm run cf-build` | Refresh snapshot, build, deploy to Cloudflare |

## Admin

`/admin` is a small dashboard for managing projects (add, edit, hide/show, delete) backed by `/api/admin/projects`. There's no login page in the app — in production the route sits behind [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/), and the API verifies the JWT Access injects (`lib/adminAuth.ts`), so requests that bypass Access get a 401.

Setup (once, in the Cloudflare Zero Trust dashboard):

1. Access → Applications → add a self-hosted app covering `mhsalman.me/admin*` and `mhsalman.me/api/admin*`.
2. Policy: allow only your email.
3. Copy the team domain and the app's Audience (AUD) tag into the Worker env as `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD`.

In development the check is skipped, so `localhost:3000/admin` just works.

## Project structure

```
app/
  api/contact/     # Contact form endpoint (Resend)
  layout.tsx       # Root layout, fonts, metadata
  page.tsx         # Home page (server component, fetches projects)
components/        # Sections (Hero, About, Projects, ...) and ui/ primitives
hooks/             # useContactForm (React Hook Form + Yup)
lib/
  mongodb.ts       # Lazy, pooled MongoDB client
  projects.ts      # Data access: query + memoize + fallback
  projects.fallback.json
  types.ts         # Shared domain types (Project)
store/             # Zustand store (UI state)
scripts/           # refresh-projects.mjs
```

## Contact

- 📧 [mehedi.salman102@gmail.com](mailto:mehedi.salman102@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/mehedihasan-salman/)
- 🐙 [GitHub](https://github.com/MdSalman2022)

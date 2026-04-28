# FIFO Jobs Guide (WA, Multi-Visa)

An interactive web guide for people exploring **entry-level FIFO mining jobs in Western Australia** across multiple visa pathways (including **417, 462, Student, and sponsored routes**).

This project started as a single Manus AI prompt and evolved into a usable, open-source website.

## Why This Exists

I originally created this as a personal research tool:

- compare entry-level FIFO roles in WA
- estimate take-home pay with a WHM baseline model
- identify recruitment agencies active in FIFO hiring

The project now serves as a practical reference website that can be updated over time.

## What The Site Includes

- Top 10 entry-level FIFO roles (salary ranges, rosters, required tickets)
- Visa pathway model and role eligibility mapping
- Visa filter and eligibility badges in jobs comparison
- Net monthly pay estimates per role
- Interactive FIFO tax estimator with explicit assumptions/disclaimer
- Perth-focused recruitment agency section
- Legal pages (Disclaimer, Privacy Policy, Terms)
- FAQ section + SEO metadata and sitemap
- Mobile-friendly UI with an "industrial blueprint" visual style

## Tech Stack

- Frontend: Vite + React + TypeScript
- UI: Tailwind CSS + Radix UI components
- Routing: Wouter
- Server build target: Node (Express entrypoint bundled via esbuild)
- Package manager: pnpm

## Local Development

### 1) Install dependencies

If `pnpm` is installed globally:

```bash
pnpm install
```

If not, use `npx` (works with the pinned project version):

```bash
npx pnpm install
```

### 2) Start dev server

```bash
npx pnpm dev
```

Default local URL:

- `http://localhost:3000/`

### 3) Validate and build

```bash
npx pnpm check
npx pnpm build
```

## Data + Tax Disclaimer

This project is an informational guide, not legal, migration, or tax advice.

- Salaries and role details are market estimates and can change by company, site, and season.
- Visa conditions should always be verified on official government sources.
- Tax outputs are simplified calculator results based on configured WHM baseline bracket logic in the codebase; they are not a substitute for professional advice.
- Medicare levy treatment varies by personal circumstance and treaty status.

Before making decisions, confirm details with:

- official immigration sources
- ATO guidance
- licensed migration/tax professionals
- recruiters and employers directly

## Project Structure

- `client/` - React app and UI components
- `client/src/data/fifoJobs.ts` - Jobs and recruitment agency dataset
- `client/src/components/TaxCalculator.tsx` - FIFO tax estimator UI/logic
- `server/` - server entrypoint for production bundle
- `shared/` - shared constants/utilities

## Vercel Go-Live Checklist

Use this sequence to take the site live with safe preview/prod settings:

1. Link repository to Vercel
   - In Vercel dashboard: Add New Project -> import this GitHub repo.
   - Build command: `npx pnpm build`
   - Output directory: `dist/public`
2. Configure domains
   - Add your primary domain (example: `fifojobsguide.com`)
   - Add `www` and set redirect to primary domain
   - If you do not have a domain yet, use `https://fifo-jobs-guide.vercel.app`
3. Configure environment variables
   - `VITE_ANALYTICS_ENDPOINT` (optional analytics host)
   - `VITE_ANALYTICS_WEBSITE_ID` (optional analytics website id)
   - Copy `.env.example` when testing values locally
4. Preview and production behavior
   - Keep automatic preview deployments enabled for all PRs/branches
   - Protect production by requiring merges into main branch only
5. Verify deployment outputs
   - `/sitemap.xml`
   - `/robots.txt`
   - legal pages (`/disclaimer`, `/privacy-policy`, `/terms`)

## Roadmap Ideas

- Add sources/citations for each salary estimate
- Add checklist for required tickets/certifications in WA
- Add region filters and role search
- Add multilingual content (English/Italian)
- Add automated data refresh/versioning

## License

MIT
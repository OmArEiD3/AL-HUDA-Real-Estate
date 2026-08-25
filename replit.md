# AL HUDA Real Estate

Premium Arabic-first real estate discovery and property management platform for Sheikh Zayed City.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/alhuda-real-estate` — public website and admin interface
- `artifacts/api-server/src/routes` — property, lead, dashboard, and health API routes
- `lib/api-spec/openapi.yaml` — source of truth for generated API clients
- `lib/db/src/schema/index.ts` — PostgreSQL property and lead schema

## Architecture decisions

- The public site defaults to Arabic/RTL and provides an English toggle; admin uses a denser operational experience.
- Property media is represented as storage-ready paths/URLs in a dedicated media array field rather than embedded image bytes.
- Deleting a property archives it by changing status, preserving catalog history.

## Product

Customers can discover and filter Sheikh Zayed listings, view property details, and submit leads. Staff can review dashboard metrics, manage property records, create listings, and review leads.

## User preferences

- Keep the AL HUDA experience premium, minimal, mobile-first, and Arabic-first.

## Gotchas

- Run API codegen after changing `lib/api-spec/openapi.yaml`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

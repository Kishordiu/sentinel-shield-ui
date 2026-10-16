# Sentinel Shield

Sentinel Shield is a zero-trust IoT control-plane prototype focused on secure device onboarding, identity, trust-state visibility and operator response workflows.

> **Project status:** Functional UI / architecture prototype. Hardware enforcement and service integrations should be verified independently before production use.

## Core concepts

- Device identity and onboarding
- Trust-state visibility and operator actions
- Explicit approval, compromised and lockdown states
- A user interface designed to keep backend and hardware contracts visible

Consult the source for the exact flows implemented in this revision; a UI state is not proof that an external device has been secured.

## Run locally

**Requirements:** Node.js 20 or newer and npm.

```bash
npm ci
cp .env.example .env
npm run dev
```

Vite prints the local development URL in the terminal.

## Environment

Create a local `.env` file from `.env.example` and set your own values:

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase publishable/anon client key |

Vite-exposed variables are public in the built frontend. Do not place service-role keys, passwords or private provider credentials in `VITE_*` variables. Apply and test Supabase RLS policies for every exposed table.

## Quality checks

```bash
npm run build
npm run lint
npm run test
```

The test script uses Vitest. Run these checks on the commit you intend to ship.

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router · Supabase · Recharts · Vitest

## Security note

This is a prototype UI. Do not rely on client-side controls as an authorization boundary; enforce security on the server and in database policies.

---
Maintained by [K. Kishor Kumar](https://github.com/Kishordiu).

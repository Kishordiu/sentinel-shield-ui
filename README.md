# Autonomous Zero-Trust Self-Defending IoT System

Production-quality frontend for managing IoT device security with zero-trust architecture.

## Quick Start

```bash
npm install
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

## Environment Variables

Create a `.env` file (or set via your hosting provider). **Do not commit this file.**

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_BASE_URL=https://your-api-server.com
```

### Where to find these:
- **`VITE_SUPABASE_URL`** — Supabase project → Settings → API → Project URL
- **`VITE_SUPABASE_ANON_KEY`** — Supabase → Settings → API → `anon` public key
- **`VITE_API_BASE_URL`** — Your backend server URL (if using custom backend)

> ⚠️ Never commit service role keys or private keys.

## Wiring Authentication

Edit `src/hooks/useAuth.tsx` — replace placeholder calls with real Supabase auth:

1. **Login** → `supabase.auth.signInWithPassword()`
2. **Google OAuth** → `supabase.auth.signInWithOAuth({ provider: 'google' })`
3. **Register** → `supabase.auth.signUp()` + company creation
4. **Logout** → `supabase.auth.signOut()`
5. **Session** → `supabase.auth.onAuthStateChange()`

## Wiring Data Hooks

Edit `src/hooks/useData.ts`:

- `useDevices()` → `supabase.from('devices').select('*')`
- `useOnboardQueue()` → `supabase.from('onboard_requests').select('*').eq('status', 'pending')`
- `useAlerts()` → `supabase.from('alerts').select('*').order('timestamp', { ascending: false })`

## API Endpoint Stubs

See `src/api-stubs/endpoints.ts` for all contracts:

| Endpoint | Method | Description |
|---|---|---|
| `/auth/register` | POST | Company + admin registration |
| `/auth/login` | POST | Email/password login |
| `/challenge` | POST | Initiate hardware verification |
| `/verify` | POST | Verify hardware challenge |
| `/tamper` | POST | Report device tamper event |
| `/onboard-request` | POST | Submit device for onboarding |
| `/admin/approve` | POST | Approve pending device |
| `/admin/unlock` | POST | Unlock locked device |

## Seeding Data (SQL)

```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'sensor',
  status TEXT NOT NULL DEFAULT 'active',
  ip_address TEXT,
  firmware_version TEXT,
  last_seen TIMESTAMPTZ DEFAULT now(),
  company_id UUID REFERENCES companies(id)
);

CREATE TABLE onboard_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_name TEXT NOT NULL,
  device_type TEXT NOT NULL,
  requested_at TIMESTAMPTZ DEFAULT now(),
  requested_by TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID REFERENCES devices(id),
  severity TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now(),
  acknowledged BOOLEAN DEFAULT false
);
```

## Demo-Only Features

- **Simulate fingerprint** button in admin modals
- **TOTP input** in unlock modal (UI only)
- **MFA prompt** placeholder on login page

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router v6 · TanStack Query

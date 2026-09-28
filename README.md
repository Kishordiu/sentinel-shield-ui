# Autonomous Zero-Trust Self-Defending IoT System

> **Security operations for connected devices — from onboarding to tamper response.**

A security-focused frontend for exploring zero-trust device management, secure onboarding, trust-state enforcement, tamper visibility and administrative control.

## What it demonstrates

- Device identity and security-state workflows
- Zero-trust onboarding and approval concepts
- Tamper detection and compromised-device lockdown flows
- Authentication and role-aware administrative UX
- Responsive operational dashboards and data visualisation

## Architecture

```text
IoT Device → Secure API → Verification Layer → Trust State → Dashboard
```

The repository contains the frontend/control-plane experience. Backend and hardware integrations are documented as implementation contracts rather than represented as completed capabilities unless explicitly implemented.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router · Supabase · Recharts · Vitest

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

### Environment

Create a local environment file and provide the values required by the application:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=your-api-url
```

Never commit service-role keys, private keys, or other secrets.

## Project status

**Security prototype / active engineering**

## Author

**K. Kishor Kumar** · [GitHub @Kishordiu](https://github.com/Kishordiu)

---

<p align="center">Built for experimentation at the intersection of cybersecurity, IoT and product engineering.</p>
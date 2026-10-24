<div align="center">
  <img src="./assets/hero-banner.svg" alt="Sentinel Shield — connected-device security operations artwork" width="100%" />
</div>

<p align="center">
  <a href="https://diufoundry.online"><img alt="DIU Foundry" src="https://img.shields.io/badge/DIU_FOUNDRY-STUDIO-0A1826?style=for-the-badge&logoColor=6BC6CE&labelColor=060A0F" /></a>
  <img alt="Device operations UI" src="https://img.shields.io/badge/DEVICE_SECURITY-OPERATIONS_UI-0A1826?style=for-the-badge&logoColor=608B9E&labelColor=060A0F" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TYPESCRIPT-v5-0A1826?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=060A0F" />
</p>

# Sentinel Shield

**A control-room interface for reviewing connected-device records, heartbeat history, and tamper-related alerts.**

Sentinel Shield is a security-operations **front-end prototype** by DIU Foundry. Its current service layer reads device, heartbeat, and tamper-log records from a configured Supabase project. The UI is a place to observe and review those records; it does not itself attest physical hardware, detect attacks on a network, or automatically quarantine a compromised device.

## At a glance

- **Device inventory:** Presents records from the configured `devices` table.
- **Heartbeat history:** Reads rows from `device_heartbeat` for operational review.
- **Tamper-log review:** Reads stored records from `tamper_logs`; detection depends on an upstream source that creates them.
- **Operator console:** A React interface for dashboard, device, alert, onboarding, and settings workflows.

## Data flow

```text
Supabase tables
  ├── devices
  ├── device_heartbeat
  └── tamper_logs
        │
        ▼
src/services/deviceService.ts
        │
        ▼
Device / dashboard / alert views
```

**Not implemented by this UI alone:** hardware attestation, secure boot, MQTT transport, TLS device provisioning, credential rotation, or real network-enforcement/quarantine. Those would need a separately implemented and security-reviewed device/backend layer.

## Stack

React · TypeScript · Vite · Tailwind CSS · Supabase JavaScript client · React Router · TanStack Query

## Run locally

**Requirements:** Node.js and npm or Bun.

```bash
git clone https://github.com/Kishordiu/sentinel-shield-ui.git
cd sentinel-shield-ui
npm install
cp .env.example .env
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` to the intended public project URL and anon/publishable key, then run:

```bash
npm run dev
npm run lint
npm test
npm run build
```

Vite exposes `VITE_*` values to browser code. Never put a Supabase service-role key or other server secret into these variables.

## Status and responsible use

**Status: front-end operations prototype.** A populated dashboard is not proof that a live device is connected or an alert is being detected. Configure and validate the data source, row-level security, and any device-side services before using real operational or security data.

---

<p align="center"><sub>DIU FOUNDRY · ENGINEERING / PRODUCT / SYSTEMS</sub></p>

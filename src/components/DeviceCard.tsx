import { Cpu, Wifi, Router, MonitorSmartphone } from "lucide-react";
import type { Device } from "@/hooks/useData";

const typeIcons: Record<string, React.FC<{ className?: string }>> = {
  sensor: Wifi,
  gateway: Router,
  controller: MonitorSmartphone,
  default: Cpu,
};

const statusConfig: Record<string, { dot: string; bar: string; label: string }> = {
  active: { dot: "bg-status-active", bar: "status-bar-active", label: "Active" },
  suspicious: { dot: "bg-status-suspicious", bar: "status-bar-suspicious", label: "Suspicious" },
  compromised: { dot: "bg-status-compromised", bar: "status-bar-compromised", label: "Compromised" },
  locked: { dot: "bg-status-locked", bar: "status-bar-locked", label: "Locked" },
  offline: { dot: "bg-muted-foreground", bar: "status-bar-offline", label: "Offline" },
};

interface DeviceCardProps {
  device: Device;
  onClick?: (device: Device) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick }) => {
  const Icon = typeIcons[device.type] ?? typeIcons.default;
  const s = statusConfig[device.status] ?? statusConfig.offline;

  return (
    <button
      onClick={() => onClick?.(device)}
      className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-[hsl(215,50%,93%)] bg-card text-left shadow-card transition-shadow hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Device ${device.name}, status ${s.label}`}
    >
      <div className="flex flex-1 items-start justify-between p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-accent p-2">
            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{device.name}</h3>
            <p className="text-xs text-muted-foreground">{device.type} · {device.ipAddress}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} aria-hidden="true" />
          <span className="text-xs font-medium text-foreground">{s.label}</span>
        </div>
      </div>

      {/* Sparkline placeholder */}
      <div className="px-4 pb-2">
        <svg className="h-6 w-full" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 18 Q25 8, 50 14 T100 10 T150 16 T200 6"
            fill="none"
            stroke="hsl(var(--sparkline))"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Status bar — 6px, full width, rounded bottom */}
      <div className={`h-1.5 w-full rounded-b-lg ${s.bar}`} />
    </button>
  );
};

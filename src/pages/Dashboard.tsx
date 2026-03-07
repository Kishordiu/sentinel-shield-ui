import { useDevices, useAlerts } from "@/hooks/useData";
import { EmptyState } from "@/components/EmptyState";
import { DeviceCard } from "@/components/DeviceCard";
import { Shield, Cpu, AlertTriangle, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statCards = [
  { label: "Total Devices", value: "0", icon: Cpu, color: "text-primary" },
  { label: "Active Threats", value: "0", icon: AlertTriangle, color: "text-status-suspicious" },
  { label: "Trust Score", value: "—", icon: Shield, color: "text-primary" },
  { label: "Uptime", value: "—", icon: Activity, color: "text-primary" },
];

const Dashboard = () => {
  const { devices, isLoading } = useDevices();
  const { alerts } = useAlerts();
  const navigate = useNavigate();

  return (
    <div className="container py-6 md:py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Live Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time overview of your IoT fleet security status</p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-card">
            <div className="mb-2 flex items-center gap-2">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Alerts banner */}
      {alerts.length === 0 && (
        <div className="mb-6 rounded-lg border bg-accent/50 p-4 text-center text-sm text-muted-foreground">
          <Shield className="mx-auto mb-1 h-5 w-5 text-primary" />
          No active security alerts
        </div>
      )}

      {/* Device grid */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">Device Overview</h2>
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : devices.length === 0 ? (
        <EmptyState type="devices" actionLabel="Register Device" onAction={() => navigate("/onboarding")} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((d) => (
            <DeviceCard key={d.id} device={d} onClick={() => navigate(`/devices/${d.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import { useParams, useNavigate } from "react-router-dom";
import { useDevices } from "@/hooks/useData";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { AdminModal } from "@/components/AdminModal";
import { useState } from "react";
import { ArrowLeft, Shield, Lock, RefreshCw, Activity, Terminal, Clock } from "lucide-react";

const DeviceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { devices } = useDevices();
  const navigate = useNavigate();
  const device = devices.find((d) => d.id === id);
  const [modal, setModal] = useState<{ open: boolean; action: "approve" | "unlock" }>({ open: false, action: "approve" });

  if (!device) {
    return (
      <div className="container py-10 animate-fade-in">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <EmptyState type="devices" title="Device not found" description="This device doesn't exist or hasn't been registered yet." />
      </div>
    );
  }

  return (
    <div className="container py-6 md:py-10 animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h1 className="text-xl font-bold text-foreground">{device.name}</h1>
            <p className="text-sm text-muted-foreground">{device.type} · {device.ipAddress} · FW {device.firmwareVersion}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => setModal({ open: true, action: "unlock" })}>
                <Lock className="mr-1 h-3 w-3" /> Unlock
              </Button>
              <Button size="sm" variant="outline">
                <RefreshCw className="mr-1 h-3 w-3" /> Restart
              </Button>
            </div>
          </div>

          {/* Timeline / Logs */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="mb-4 text-base font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Event Timeline
            </h2>
            <EmptyState type="generic" title="No events recorded" description="Device activity logs will appear here once connected." />
          </div>

          {/* Activity graph placeholder */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="mb-4 text-base font-semibold text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Activity
            </h2>
            <div className="h-32 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
              {/* TODO: wire recharts here */}
              Activity chart will render with live data
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="mb-3 text-sm font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Security Status
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Trust Level</span><span className="font-medium text-foreground">—</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Certificate</span><span className="font-medium text-foreground">—</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last Verified</span><span className="font-medium text-foreground">—</span></div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="mb-3 text-sm font-semibold text-foreground flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" /> Console
            </h2>
            <div className="rounded-lg bg-foreground/5 p-3 font-mono text-xs text-muted-foreground">
              <p>$ awaiting connection…</p>
            </div>
          </div>
        </div>
      </div>

      <AdminModal
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        action={modal.action}
        deviceName={device.name}
      />
    </div>
  );
};

export default DeviceDetail;

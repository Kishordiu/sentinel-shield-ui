import { useState } from "react";
import { useDevices } from "@/hooks/useData";
import { EmptyState } from "@/components/EmptyState";
import { DeviceCard } from "@/components/DeviceCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Map } from "lucide-react";

const DeviceList = () => {
  const { devices, isLoading } = useDevices();
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "map">("grid");

  return (
    <div className="container py-6 md:py-10 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Devices</h1>
          <p className="text-sm text-muted-foreground">{devices.length} registered devices</p>
        </div>
        <div className="flex gap-1 rounded-lg border bg-muted p-0.5">
          <Button size="sm" variant={view === "grid" ? "default" : "ghost"} onClick={() => setView("grid")} aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button size="sm" variant={view === "map" ? "default" : "ghost"} onClick={() => setView("map")} aria-label="Map view">
            <Map className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : devices.length === 0 ? (
        <EmptyState type="devices" actionLabel="Onboard First Device" onAction={() => navigate("/onboarding")} />
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((d) => (
            <DeviceCard key={d.id} device={d} onClick={() => navigate(`/devices/${d.id}`)} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-xl border bg-card text-sm text-muted-foreground">
          {/* TODO: integrate a map library (e.g. react-leaflet) and plot device locations */}
          Map view — connect a map library and device GPS coordinates to display
        </div>
      )}
    </div>
  );
};

export default DeviceList;

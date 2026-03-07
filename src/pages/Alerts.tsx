import { EmptyState } from "@/components/EmptyState";
import { useAlerts } from "@/hooks/useData";

const Alerts = () => {
  const { alerts } = useAlerts();

  return (
    <div className="container py-6 md:py-10 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Security Alerts</h1>
        <p className="text-sm text-muted-foreground">Monitor and respond to security events</p>
      </div>

      {alerts.length === 0 ? (
        <EmptyState type="alerts" />
      ) : (
        <div className="space-y-3">
          {/* TODO: render alert items */}
        </div>
      )}
    </div>
  );
};

export default Alerts;

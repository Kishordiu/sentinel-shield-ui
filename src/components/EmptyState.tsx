import { ShieldOff, Inbox, Cpu, Users, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "devices" | "onboarding" | "admins" | "alerts" | "generic";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const icons = {
  devices: Cpu,
  onboarding: Inbox,
  admins: Users,
  alerts: ShieldOff,
  generic: FileQuestion,
};

const defaults: Record<string, { title: string; description: string }> = {
  devices: { title: "No devices yet", description: "Register your first IoT device to start monitoring your network." },
  onboarding: { title: "Onboarding queue is empty", description: "New device requests will appear here for review." },
  admins: { title: "No administrators", description: "Invite team members to manage your IoT fleet." },
  alerts: { title: "All clear", description: "No security alerts at this time. Your network is operating normally." },
  generic: { title: "Nothing here yet", description: "Content will appear once data is available." },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const Icon = icons[type];
  const d = defaults[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in" role="status">
      <div className="mb-4 rounded-2xl bg-accent p-4">
        <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title ?? d.title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description ?? d.description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

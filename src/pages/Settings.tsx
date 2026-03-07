import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { User, Bell, Shield, HelpCircle, LogOut } from "lucide-react";

const Settings = () => {
  const { user, logout } = useAuth();

  const sections = [
    { icon: User, title: "Profile", desc: "Manage your account details and preferences" },
    { icon: Bell, title: "Notifications", desc: "Configure alert thresholds and delivery channels" },
    { icon: Shield, title: "Security", desc: "MFA setup, session management, and API keys" },
    { icon: HelpCircle, title: "Help & Support", desc: "Documentation, FAQs, and contact support" },
  ];

  return (
    <div className="container py-6 md:py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Logged in as {user?.email ?? "—"}</p>
      </div>

      <div className="space-y-3 max-w-2xl">
        {sections.map((s) => (
          <button
            key={s.title}
            className="flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left shadow-card transition-shadow hover:shadow-card-hover"
            aria-label={s.title}
          >
            <div className="rounded-lg bg-accent p-2.5">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <Button variant="destructive" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Settings;

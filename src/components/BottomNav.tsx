import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Cpu, ClipboardList, Bell, User } from "lucide-react";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/devices", icon: Cpu, label: "Devices" },
  { to: "/onboarding", icon: ClipboardList, label: "Onboard" },
  { to: "/alerts", icon: Bell, label: "Alerts" },
  { to: "/settings", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-md safe-bottom md:hidden"
      aria-label="Bottom navigation"
      role="navigation"
    >
      <div className="flex h-16 items-center justify-around">
        {items.map(({ to, icon: Icon, label }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

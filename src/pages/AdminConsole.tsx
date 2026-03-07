import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { AdminModal } from "@/components/AdminModal";
import { Button } from "@/components/ui/button";
import { Users, Building, Cpu, Plus } from "lucide-react";

const tabs = [
  { id: "admins", label: "Administrators", icon: Users },
  { id: "companies", label: "Companies", icon: Building },
  { id: "hardware", label: "Hardware Modules", icon: Cpu },
] as const;

type Tab = typeof tabs[number]["id"];

const AdminConsole = () => {
  const [tab, setTab] = useState<Tab>("admins");
  const [modal, setModal] = useState(false);

  return (
    <div className="container py-6 md:py-10 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Console</h1>
          <p className="text-sm text-muted-foreground">Manage administrators, companies, and hardware modules</p>
        </div>
        <Button onClick={() => setModal(true)}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>

      <div className="mb-6 flex gap-1 rounded-lg border bg-muted p-0.5">
        {tabs.map((t) => (
          <Button
            key={t.id}
            size="sm"
            variant={tab === t.id ? "default" : "ghost"}
            onClick={() => setTab(t.id)}
            className="flex-1"
          >
            <t.icon className="mr-1.5 h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.label}</span>
          </Button>
        ))}
      </div>

      {tab === "admins" && <EmptyState type="admins" actionLabel="Invite Admin" onAction={() => setModal(true)} />}
      {tab === "companies" && <EmptyState type="generic" title="No companies" description="Companies will appear here once registered." />}
      {tab === "hardware" && <EmptyState type="generic" title="No hardware modules" description="Register hardware security modules to enable device verification." />}

      <AdminModal open={modal} onClose={() => setModal(false)} action="approve" />
    </div>
  );
};

export default AdminConsole;

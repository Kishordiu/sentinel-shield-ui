import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { toast } from "sonner";

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [companyName, setCompanyName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompanyNext = () => {
    if (!companyName.trim()) { toast.error("Company name required"); return; }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName || !adminEmail || !password) { toast.error("Fill all fields"); return; }
    setLoading(true);
    try {
      await register({ companyName, adminName, adminEmail, password });
      if (inviteEmail) {
        // TODO: wire to invite API — POST /auth/invite
        toast.info(`Invite sent to ${inviteEmail} (demo)`);
      }
      navigate("/dashboard");
    } catch {
      toast.error("Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-3 h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === 1 ? "Start by registering your company" : "Set up your admin account"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-6 flex gap-2">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="company" className="mb-1 block text-sm font-medium text-foreground">Company Name</label>
              <input id="company" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Acme IoT Corp" required />
            </div>
            <Button className="w-full" onClick={handleCompanyNext}>Continue</Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">Your Name</label>
              <input id="name" type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Jane Smith" required />
            </div>
            <div>
              <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-foreground">Email</label>
              <input id="reg-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="admin@company.com" required />
            </div>
            <div>
              <label htmlFor="reg-password" className="mb-1 block text-sm font-medium text-foreground">Password</label>
              <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="Min 8 characters" required minLength={8} />
            </div>
            <div>
              <label htmlFor="invite" className="mb-1 block text-sm font-medium text-foreground">Invite another admin <span className="text-muted-foreground">(optional)</span></label>
              <input id="invite" type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none" placeholder="colleague@company.com" />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" className="flex-1" disabled={loading}>{loading ? "Creating…" : "Create Account"}</Button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Fingerprint, KeyRound } from "lucide-react";
import { toast } from "sonner";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  action: "approve" | "unlock";
  deviceName?: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({ open, onClose, action, deviceName }) => {
  const [step, setStep] = useState<"reason" | "verify" | "totp">("reason");
  const [reason, setReason] = useState("");
  const [totp, setTotp] = useState("");
  const [verified, setVerified] = useState(false);

  const handleSimulateFingerprint = () => {
    // TODO: wire to /challenge and /verify endpoints
    setVerified(true);
    toast.success("Fingerprint verified (demo)");
  };

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason.");
      return;
    }
    // TODO: wire to /admin/approve or /admin/unlock
    toast.success(`${action === "approve" ? "Approved" : "Unlocked"}: ${deviceName}`);
    resetAndClose();
  };

  const resetAndClose = () => {
    setStep("reason");
    setReason("");
    setTotp("");
    setVerified(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md" aria-describedby="admin-modal-desc">
        <DialogHeader>
          <DialogTitle className="capitalize">{action} Device{deviceName ? `: ${deviceName}` : ""}</DialogTitle>
        </DialogHeader>
        <p id="admin-modal-desc" className="text-sm text-muted-foreground">
          This action requires hardware verification and a reason.
        </p>

        {step === "reason" && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Reason for action</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-md border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
              placeholder="Describe why this action is needed..."
              rows={3}
              aria-required="true"
            />
            <Button className="w-full" onClick={() => reason.trim() ? setStep("verify") : toast.error("Reason is required")} disabled={!reason.trim()}>
              Continue
            </Button>
          </div>
        )}

        {step === "verify" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="rounded-2xl bg-accent p-6">
              <Fingerprint className={`h-16 w-16 transition-colors ${verified ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            {!verified ? (
              <>
                <p className="text-sm text-muted-foreground">Place your finger on the sensor or NFC tag</p>
                <Button variant="outline" onClick={handleSimulateFingerprint}>
                  <Fingerprint className="mr-2 h-4 w-4" />
                  Simulate fingerprint (demo)
                </Button>
                <p className="text-[10px] text-muted-foreground italic">Demo-only: In production, this requires real hardware verification</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-primary">✓ Hardware verified</p>
                {action === "unlock" ? (
                  <Button onClick={() => setStep("totp")}>Continue to TOTP</Button>
                ) : (
                  <Button onClick={handleSubmit}>Confirm {action}</Button>
                )}
              </>
            )}
          </div>
        )}

        {step === "totp" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-primary" />
              <label className="text-sm font-medium text-foreground">Enter TOTP code</label>
            </div>
            <input
              type="text"
              maxLength={6}
              value={totp}
              onChange={(e) => setTotp(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-md border bg-background px-4 py-3 text-center text-2xl tracking-[0.5em] text-foreground focus:ring-1 focus:ring-ring focus:outline-none"
              placeholder="000000"
              aria-label="TOTP verification code"
            />
            <p className="text-[10px] text-muted-foreground italic">UI only — TOTP validation not implemented in demo</p>
            <DialogFooter>
              <Button className="w-full" onClick={handleSubmit} disabled={totp.length < 6}>
                Confirm Unlock
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

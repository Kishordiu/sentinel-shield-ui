import { useState, useRef } from "react";
import type { OnboardRequest } from "@/hooks/useData";
import { Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OnboardCardProps {
  request: OnboardRequest;
  onApprove: (id: string, reason: string) => void;
  onReject: (id: string, reason: string) => void;
}

export const OnboardCard: React.FC<OnboardCardProps> = ({ request, onApprove, onReject }) => {
  const [offset, setOffset] = useState(0);
  const [reason, setReason] = useState("");
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diff = e.touches[0].clientX - startX.current;
    setOffset(Math.max(-120, Math.min(120, diff)));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (offset > 80) {
      if (!reason.trim()) {
        toast.error("Please provide a reason before approving.");
        setOffset(0);
        return;
      }
      onApprove(request.id, reason);
      toast.success(`Approved ${request.deviceName}`, {
        action: { label: "Undo", onClick: () => { /* TODO: undo logic */ } },
      });
    } else if (offset < -80) {
      if (!reason.trim()) {
        toast.error("Please provide a reason before rejecting.");
        setOffset(0);
        return;
      }
      onReject(request.id, reason);
      toast.success(`Rejected ${request.deviceName}`, {
        action: { label: "Undo", onClick: () => { /* TODO: undo logic */ } },
      });
    }
    setOffset(0);
  };

  return (
    <div className="relative overflow-hidden rounded-lg border bg-card">
      {/* Swipe bg indicators */}
      <div className="absolute inset-y-0 left-0 flex w-24 items-center justify-center bg-primary/10">
        <Check className="h-6 w-6 text-primary" />
      </div>
      <div className="absolute inset-y-0 right-0 flex w-24 items-center justify-center bg-destructive/10">
        <X className="h-6 w-6 text-destructive" />
      </div>

      <div
        className="relative z-10 bg-card p-4 transition-transform"
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-foreground">{request.deviceName}</h4>
            <p className="text-xs text-muted-foreground">{request.deviceType} · Requested by {request.requestedBy}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {request.requestedAt}
          </div>
        </div>

        <input
          type="text"
          placeholder="Reason (required for action)..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-3 w-full rounded-md border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          aria-label="Reason for action"
        />

        <div className="mt-3 flex gap-2 md:hidden">
          <p className="text-[10px] text-muted-foreground italic">Swipe right to approve, left to reject</p>
        </div>
        <div className="mt-3 hidden gap-2 md:flex">
          <Button size="sm" onClick={() => reason.trim() ? onApprove(request.id, reason) : toast.error("Provide a reason")}>
            <Check className="mr-1 h-3 w-3" /> Approve
          </Button>
          <Button size="sm" variant="destructive" onClick={() => reason.trim() ? onReject(request.id, reason) : toast.error("Provide a reason")}>
            <X className="mr-1 h-3 w-3" /> Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

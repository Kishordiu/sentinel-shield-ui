import { useOnboardQueue } from "@/hooks/useData";
import { EmptyState } from "@/components/EmptyState";
import { OnboardCard } from "@/components/OnboardCard";

const OnboardingQueue = () => {
  const { requests, isLoading, approveRequest, rejectRequest } = useOnboardQueue();

  return (
    <div className="container py-6 md:py-10 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Onboarding Queue</h1>
        <p className="text-sm text-muted-foreground">Review and approve pending device registration requests</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : requests.length === 0 ? (
        <EmptyState type="onboarding" />
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <OnboardCard key={r.id} request={r} onApprove={approveRequest} onReject={rejectRequest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OnboardingQueue;

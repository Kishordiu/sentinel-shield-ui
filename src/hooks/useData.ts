// Empty data hooks — ready to wire to Supabase/API

export interface Device {
  id: string;
  name: string;
  type: string;
  status: "active" | "suspicious" | "compromised" | "locked" | "offline";
  ipAddress: string;
  firmwareVersion: string;
  lastSeen: string;
  companyId: string;
}

export interface OnboardRequest {
  id: string;
  deviceName: string;
  deviceType: string;
  requestedAt: string;
  requestedBy: string;
  status: "pending" | "approved" | "rejected";
}

export interface Alert {
  id: string;
  deviceId: string;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

// TODO: wire to Supabase — e.g. supabase.from('devices').select('*')
export const useDevices = () => {
  const devices: Device[] = [];
  const isLoading = false;
  return { devices, isLoading };
};

// TODO: wire to Supabase — e.g. supabase.from('onboard_requests').select('*').eq('status','pending')
export const useOnboardQueue = () => {
  const requests: OnboardRequest[] = [];
  const isLoading = false;
  const approveRequest = async (_id: string, _reason: string) => {
    // TODO: wire to /admin/approve endpoint
  };
  const rejectRequest = async (_id: string, _reason: string) => {
    // TODO: wire to API
  };
  return { requests, isLoading, approveRequest, rejectRequest };
};

// TODO: wire to Supabase
export const useAlerts = () => {
  const alerts: Alert[] = [];
  const isLoading = false;
  return { alerts, isLoading };
};

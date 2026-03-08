import React from "react"
import DeviceCard from "@/components/DeviceCard"
import { useDevices, useAlerts } from "@/hooks/useData"

export default function Dashboard() {

const { devices, isLoading } = useDevices()
const { alerts } = useAlerts()

return (
<div className="p-6 space-y-8">

  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      Sentinel Shield Dashboard
    </h1>
    <p className="text-gray-500">
      Zero-Trust IoT Device Monitoring
    </p>
  </div>

  {/* DEVICE GRID */}

  <div>

    <h2 className="text-xl font-semibold mb-4 text-gray-700">
      Devices
    </h2>

    {isLoading ? (
      <p className="text-gray-500">Loading devices...</p>
    ) : devices.length === 0 ? (
      <p className="text-gray-500">No devices registered yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}

      </div>
    )}

  </div>

  {/* ALERTS */}

  <div>

    <h2 className="text-xl font-semibold mb-4 text-red-600">
      Tamper Alerts
    </h2>

    {alerts.length === 0 ? (
      <p className="text-gray-500">No alerts detected.</p>
    ) : (
      <div className="space-y-3">

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-red-50 border border-red-200 p-4 rounded-lg"
          >
            <p className="font-semibold text-red-700">
              Device: {alert.device_id}
            </p>

            <p className="text-sm text-gray-700">
              {alert.tamper_type}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(alert.detected_at).toLocaleString()}
            </p>
          </div>
        ))}

      </div>
    )}

  </div>

</div>

)
}
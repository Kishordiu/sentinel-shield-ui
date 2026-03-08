import React from "react"

interface Device {
  id: string
  device_id: string
  device_name: string
  device_type: string
  status: string
  firmware_version: string
  last_seen: string
}

interface Props {
  device: Device
}

function DeviceCard({ device }: Props) {

  const getStatusColor = () => {

    switch (device.status) {

      case "active":
        return "bg-green-500"

      case "suspicious":
        return "bg-yellow-500"

      case "compromised":
        return "bg-red-500"

      case "locked":
        return "bg-orange-500"

      default:
        return "bg-gray-400"
    }

  }

  return (

    <div className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-2">

        <h3 className="text-lg font-semibold">
          {device.device_name}
        </h3>

        <span className={`w-3 h-3 rounded-full ${getStatusColor()}`} />

      </div>

      <p className="text-sm text-gray-500">
        ID: {device.device_id}
      </p>

      <p className="text-sm text-gray-500">
        Type: {device.device_type}
      </p>

      <p className="text-sm text-gray-500">
        Firmware: {device.firmware_version}
      </p>

      <p className="text-xs text-gray-400 mt-2">
        Last seen: {device.last_seen}
      </p>

    </div>

  )

}

export { DeviceCard }
export default DeviceCard
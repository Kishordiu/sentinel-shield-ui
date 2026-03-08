import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export interface Device {
  id: string
  device_id: string
  device_name: string
  device_type: string
  status: "active" | "suspicious" | "compromised" | "locked" | "pending"
  firmware_hash: string
  key_locked: boolean
  last_seen: string
  created_at: string
}

export interface OnboardRequest {
  id: string
  device_id: string
  device_name: string
  device_type: string
  created_at: string
}

export interface Alert {
  id: string
  device_id: string
  tamper_type: string
  detected_at: string
}

/* ---------------- DEVICE LIST ---------------- */

export const useDevices = () => {

  const [devices, setDevices] = useState<Device[]>([])
  const [isLoading, setLoading] = useState(true)

  async function loadDevices() {

    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setDevices(data)
    }

    setLoading(false)

  }

  useEffect(() => {

    loadDevices()

    const channel = supabase
      .channel("devices-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "devices"
        },
        () => loadDevices()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  return { devices, isLoading }

}

/* ---------------- ONBOARDING QUEUE ---------------- */

export const useOnboardQueue = () => {

  const [requests, setRequests] = useState<OnboardRequest[]>([])
  const [isLoading, setLoading] = useState(true)

  async function loadQueue() {

    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setRequests(data)
    }

    setLoading(false)

  }

  useEffect(() => {

    loadQueue()

  }, [])

  const approveRequest = async (id: string) => {

    await supabase
      .from("devices")
      .update({
        status: "active"
      })
      .eq("id", id)

    loadQueue()

  }

  const rejectRequest = async (id: string) => {

    await supabase
      .from("devices")
      .update({
        status: "locked"
      })
      .eq("id", id)

    loadQueue()

  }

  return {
    requests,
    isLoading,
    approveRequest,
    rejectRequest
  }

}

/* ---------------- ALERTS ---------------- */

export const useAlerts = () => {

  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isLoading, setLoading] = useState(true)

  async function loadAlerts() {

    const { data, error } = await supabase
      .from("tamper_logs")
      .select("*")
      .order("detected_at", { ascending: false })

    if (!error && data) {
      setAlerts(data)
    }

    setLoading(false)

  }

  useEffect(() => {

    loadAlerts()

    const channel = supabase
      .channel("alerts-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tamper_logs"
        },
        () => loadAlerts()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  return { alerts, isLoading }

}
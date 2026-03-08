import { supabase } from "../lib/supabaseClient"

export async function getDevices() {
  const { data, error } = await supabase
    .from("devices")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getTamperLogs() {
  const { data, error } = await supabase
    .from("tamper_logs")
    .select("*")
    .order("detected_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getHeartbeat() {
  const { data, error } = await supabase
    .from("device_heartbeat")
    .select("*")
    .order("timestamp", { ascending: false })

  if (error) throw error
  return data
}
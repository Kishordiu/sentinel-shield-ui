import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useDeviceRealtime(onUpdate:any) {
  useEffect(() => {
    const channel = supabase
      .channel("devices-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "devices" },
        payload => {
          onUpdate(payload)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
}
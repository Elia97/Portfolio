import { useEffect, useRef, useState } from "react"
import type { DashboardState } from "../../lib/smoothie/types"

export type SaveStatus = "idle" | "saving" | "saved" | "error"

const DEBOUNCE_MS = 400

export function useDebouncedSave(
  state: DashboardState,
  initialState: DashboardState
): SaveStatus {
  const [status, setStatus] = useState<SaveStatus>("idle")
  const lastSavedRef = useRef<DashboardState>(initialState)
  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (state === lastSavedRef.current) return
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      abortRef.current?.abort()
      const ctrl = new AbortController()
      abortRef.current = ctrl
      setStatus("saving")
      try {
        const res = await fetch("/smoothie/api/state/", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(state),
          signal: ctrl.signal,
          credentials: "same-origin",
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        lastSavedRef.current = state
        setStatus("saved")
      } catch (err) {
        if ((err as Error).name === "AbortError") return
        console.error("Save failed", err)
        setStatus("error")
      }
    }, DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [state])

  return status
}

import type { SaveStatus } from "./useDebouncedSave"

const LABELS: Record<SaveStatus, string> = {
  idle: "",
  saving: "Salvataggio…",
  saved: "✓ Salvato",
  error: "⚠ Errore di salvataggio",
}

export function SaveIndicator({ status }: { status: SaveStatus }) {
  return (
    <div
      className={`save-indicator ${status}`}
      role="status"
      aria-live="polite"
    >
      {LABELS[status]}
    </div>
  )
}

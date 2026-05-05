export type ProjectStatus = "todo" | "doing" | "done" | "risk"
export type TaskStatus = "todo" | "doing" | "done"
export type Priority = "H" | "M" | "L"

export interface Task {
  id: string
  name: string
  days: number
  status: TaskStatus
}

export interface Project {
  id: string
  name: string
  color: string
  stack: string
  rate: number
  status: ProjectStatus
  priority: Priority
  weekStart: number
  weekEnd: number
  scope: string
  ref: string
  tasks: Task[]
  risks: string[]
}

export interface DashboardState {
  availableDays: number
  projects: Project[]
}

export const PROJECT_STATUS: Record<ProjectStatus, { label: string }> = {
  todo: { label: "Da iniziare" },
  doing: { label: "In corso" },
  done: { label: "Completato" },
  risk: { label: "A rischio" },
}

export const TASK_STATUS: Record<TaskStatus, { label: string }> = {
  todo: { label: "Da fare" },
  doing: { label: "In corso" },
  done: { label: "Fatto" },
}

export const PRIORITY: Record<Priority, { label: string; className: string }> =
  {
    H: { label: "Alta", className: "pri-h" },
    M: { label: "Media", className: "pri-m" },
    L: { label: "Bassa", className: "pri-l" },
  }

export const PROJECT_COLORS = [
  "#0891b2",
  "#7c3aed",
  "#dc2626",
  "#ea580c",
  "#15803d",
  "#0284c7",
  "#db2777",
  "#0d9488",
  "#9333ea",
  "#65a30d",
] as const

export function isDashboardState(value: unknown): value is DashboardState {
  if (typeof value !== "object" || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.availableDays === "number" &&
    Number.isFinite(v.availableDays) &&
    Array.isArray(v.projects)
  )
}

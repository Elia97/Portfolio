import { useCallback, useState } from "react"
import type {
  DashboardState,
  Project,
  ProjectStatus,
  Priority,
  Task,
  TaskStatus,
} from "../../lib/smoothie/types"
import { PROJECT_COLORS } from "../../lib/smoothie/types"
import { uid } from "../../lib/smoothie/uid"

export type ProjectPatch = Partial<
  Pick<
    Project,
    | "name"
    | "stack"
    | "rate"
    | "status"
    | "priority"
    | "weekStart"
    | "weekEnd"
    | "scope"
    | "ref"
    | "color"
  >
> & { status?: ProjectStatus; priority?: Priority }

export type TaskPatch = Partial<Pick<Task, "name" | "days" | "status">> & {
  status?: TaskStatus
}

export interface DashboardStore {
  state: DashboardState
  setAvailableDays: (days: number) => void
  updateProject: (pid: string, patch: ProjectPatch) => void
  addProject: () => void
  deleteProject: (pid: string) => void
  updateTask: (pid: string, tid: string, patch: TaskPatch) => void
  addTask: (pid: string) => void
  deleteTask: (pid: string, tid: string) => void
  addRisk: (pid: string) => void
  updateRisk: (pid: string, idx: number, value: string) => void
  deleteRisk: (pid: string, idx: number) => void
  replaceState: (next: DashboardState) => void
}

function patchProject(
  state: DashboardState,
  pid: string,
  fn: (p: Project) => Project
): DashboardState {
  return {
    ...state,
    projects: state.projects.map((p) => (p.id === pid ? fn(p) : p)),
  }
}

export function useDashboardStore(initial: DashboardState): DashboardStore {
  const [state, setState] = useState<DashboardState>(initial)

  const setAvailableDays = useCallback((days: number) => {
    setState((s) => ({ ...s, availableDays: Math.max(1, days) }))
  }, [])

  const updateProject = useCallback((pid: string, patch: ProjectPatch) => {
    setState((s) => patchProject(s, pid, (p) => ({ ...p, ...patch })))
  }, [])

  const addProject = useCallback(() => {
    setState((s) => {
      const newP: Project = {
        id: uid("p"),
        name: "Nuovo progetto",
        color: PROJECT_COLORS[s.projects.length % PROJECT_COLORS.length],
        stack: "Astro + Strapi",
        rate: 250,
        status: "todo",
        priority: "M",
        weekStart: 1,
        weekEnd: 2,
        scope: "Descrizione del progetto…",
        ref: "",
        tasks: [{ id: uid("t"), name: "Setup", days: 1, status: "todo" }],
        risks: [],
      }
      return { ...s, projects: [...s.projects, newP] }
    })
  }, [])

  const deleteProject = useCallback((pid: string) => {
    setState((s) => ({
      ...s,
      projects: s.projects.filter((p) => p.id !== pid),
    }))
  }, [])

  const updateTask = useCallback(
    (pid: string, tid: string, patch: TaskPatch) => {
      setState((s) =>
        patchProject(s, pid, (p) => ({
          ...p,
          tasks: p.tasks.map((t) => (t.id === tid ? { ...t, ...patch } : t)),
        }))
      )
    },
    []
  )

  const addTask = useCallback((pid: string) => {
    setState((s) =>
      patchProject(s, pid, (p) => ({
        ...p,
        tasks: [
          ...p.tasks,
          { id: uid("t"), name: "Nuovo task", days: 1, status: "todo" },
        ],
      }))
    )
  }, [])

  const deleteTask = useCallback((pid: string, tid: string) => {
    setState((s) =>
      patchProject(s, pid, (p) => ({
        ...p,
        tasks: p.tasks.filter((t) => t.id !== tid),
      }))
    )
  }, [])

  const addRisk = useCallback((pid: string) => {
    setState((s) =>
      patchProject(s, pid, (p) => ({
        ...p,
        risks: [...p.risks, "Nuovo rischio"],
      }))
    )
  }, [])

  const updateRisk = useCallback((pid: string, idx: number, value: string) => {
    setState((s) =>
      patchProject(s, pid, (p) => ({
        ...p,
        risks: p.risks.map((r, i) => (i === idx ? value : r)),
      }))
    )
  }, [])

  const deleteRisk = useCallback((pid: string, idx: number) => {
    setState((s) =>
      patchProject(s, pid, (p) => ({
        ...p,
        risks: p.risks.filter((_, i) => i !== idx),
      }))
    )
  }, [])

  const replaceState = useCallback((next: DashboardState) => {
    setState(next)
  }, [])

  return {
    state,
    setAvailableDays,
    updateProject,
    addProject,
    deleteProject,
    updateTask,
    addTask,
    deleteTask,
    addRisk,
    updateRisk,
    deleteRisk,
    replaceState,
  }
}

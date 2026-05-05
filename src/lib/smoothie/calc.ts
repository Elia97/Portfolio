import type { Project, DashboardState } from "./types"

export function projectDays(p: Project): number {
  return p.tasks.reduce((s, t) => s + (Number(t.days) || 0), 0)
}

export function projectTotal(p: Project): number {
  return projectDays(p) * (Number(p.rate) || 0)
}

export interface DashboardTotals {
  totalDays: number
  totalRev: number
  avgRate: number
  totalTasks: number
  totalProjects: number
  buffer: number
  capacityPct: number
}

export function computeTotals(state: DashboardState): DashboardTotals {
  const totalDays = state.projects.reduce((s, p) => s + projectDays(p), 0)
  const totalRev = state.projects.reduce((s, p) => s + projectTotal(p), 0)
  const avgRate = totalDays > 0 ? totalRev / totalDays : 0
  const totalTasks = state.projects.reduce((s, p) => s + p.tasks.length, 0)
  const buffer = state.availableDays - totalDays
  const capacityPct =
    state.availableDays > 0 ? (totalDays / state.availableDays) * 100 : 0
  return {
    totalDays,
    totalRev,
    avgRate,
    totalTasks,
    totalProjects: state.projects.length,
    buffer,
    capacityPct,
  }
}

const WEEK_START_DATE = new Date(2026, 4, 11)

export function weekDates(idx: number): string {
  const monday = new Date(WEEK_START_DATE)
  monday.setDate(WEEK_START_DATE.getDate() + idx * 7)
  const friday = new Date(monday)
  friday.setDate(monday.getDate() + 4)
  const f = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`
  return `${f(monday)}–${f(friday)}`
}

export function fmt(n: number): string {
  return Number(n).toLocaleString("it-IT")
}

export function fmtEur(n: number): string {
  return "€ " + Number(n).toLocaleString("it-IT")
}

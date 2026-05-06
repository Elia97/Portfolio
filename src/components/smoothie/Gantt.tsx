import type { Project } from "../../lib/smoothie/types"
import {
  projectDays,
  projectRemainingDays,
  weekDates,
  fmtEur,
  WEEK_START_DATE,
} from "../../lib/smoothie/calc"

const WEEKS_COUNT = 9
const HOLIDAY_WEEK = 5

interface Props {
  projects: Project[]
}

function computeTodayPosition(now: Date): {
  weekIdx: number
  dayPct: number
} | null {
  const startMidnight = new Date(
    WEEK_START_DATE.getFullYear(),
    WEEK_START_DATE.getMonth(),
    WEEK_START_DATE.getDate()
  )
  const todayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const diffDays = Math.floor(
    (todayMidnight.getTime() - startMidnight.getTime()) / 86_400_000
  )
  if (diffDays < 0) return null
  const weekIdx = Math.floor(diffDays / 7)
  if (weekIdx >= WEEKS_COUNT) return null
  const dayPct = (diffDays - weekIdx * 7) / 7
  return { weekIdx, dayPct }
}

export function Gantt({ projects }: Props) {
  const today = computeTodayPosition(new Date())
  const todayLeft = today
    ? `calc(200px + 4px + ${today.weekIdx} * ((100% - 236px) / ${WEEKS_COUNT} + 4px) + ${today.dayPct} * (100% - 236px) / ${WEEKS_COUNT})`
    : null
  return (
    <>
      <h2>Timeline · 9 settimane (4 mag → 3 lug)</h2>
      <div className="gantt">
        <div className="gantt-grid">
          <div className="gantt-head proj-col">Progetto</div>
          {Array.from({ length: WEEKS_COUNT }, (_, i) => (
            <div className="gantt-head" key={i}>
              W{i + 1}
              <br />
              <span style={{ fontWeight: 400, fontSize: 10 }}>
                {weekDates(i)}
              </span>
            </div>
          ))}
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
          {todayLeft && (
            <div
              className="gantt-today"
              style={{ left: todayLeft }}
              title="Oggi"
            />
          )}
        </div>
        <div style={{ fontSize: 11, color: "var(--c-muted)", marginTop: 10 }}>
          ⚠️ Strisce arancioni = festività · 2 giugno (Festa della Repubblica)
          cade in W{HOLIDAY_WEEK} · linea rossa = oggi
        </div>
      </div>
    </>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const days = projectRemainingDays(project)
  const total = projectDays(project) * project.rate
  return (
    <>
      <div className="gantt-row-label">{project.name}</div>
      {Array.from({ length: 9 }, (_, i) => {
        const w = i + 1
        const inRange = w >= project.weekStart && w <= project.weekEnd
        const isFirst = w === project.weekStart
        const isHoliday = w === HOLIDAY_WEEK
        return (
          <div className="gantt-cell" key={w}>
            {isHoliday && (
              <div className="holiday-mark" style={{ left: "12%" }} />
            )}
            {inRange && (
              <div className="gantt-bar" style={{ background: project.color }}>
                {isFirst ? `${days}gg · ${fmtEur(total)}` : ""}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

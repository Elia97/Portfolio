import type { Project } from "../../lib/smoothie/types"
import { projectDays, weekDates, fmtEur } from "../../lib/smoothie/calc"

interface Props {
  projects: Project[]
}

export function Gantt({ projects }: Props) {
  return (
    <>
      <h2>Timeline · 9 settimane (11 mag → 10 lug)</h2>
      <div className="gantt">
        <div className="gantt-grid">
          <div className="gantt-head proj-col">Progetto</div>
          {Array.from({ length: 9 }, (_, i) => (
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
        </div>
        <div style={{ fontSize: 11, color: "var(--c-muted)", marginTop: 10 }}>
          ⚠️ Strisce arancioni = festività · 2 giugno (Festa della Repubblica)
          cade in W4
        </div>
      </div>
    </>
  )
}

function ProjectRow({ project }: { project: Project }) {
  const days = projectDays(project)
  const total = days * project.rate
  return (
    <>
      <div className="gantt-row-label">{project.name}</div>
      {Array.from({ length: 9 }, (_, i) => {
        const w = i + 1
        const inRange = w >= project.weekStart && w <= project.weekEnd
        const isFirst = w === project.weekStart
        const isHoliday = w === 4
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

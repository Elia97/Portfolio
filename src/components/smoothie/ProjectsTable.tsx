import type { DashboardStore } from "./useDashboardStore"
import {
  PROJECT_STATUS,
  PRIORITY,
  type ProjectStatus,
  type Priority,
} from "../../lib/smoothie/types"
import {
  projectDays,
  projectRemainingDays,
  fmt,
  fmtEur,
} from "../../lib/smoothie/calc"

const WEEKS = Array.from({ length: 9 }, (_, i) => i + 1)

interface Props {
  store: DashboardStore
  totals: {
    totalDays: number
    remainingDays: number
    totalRev: number
    avgRate: number
  }
}

export function ProjectsTable({ store, totals }: Props) {
  const { state, updateProject, deleteProject } = store
  return (
    <>
      <h2>
        Progetti — riepilogo
        <span className="hint">
          clicca tariffa, periodo, priorità per modificare · le giornate
          mostrate sono i task non ancora completati (hover per il totale)
        </span>
      </h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Progetto</th>
              <th>Stack</th>
              <th>Stato</th>
              <th className="num">Giornate</th>
              <th className="num">€/gg</th>
              <th className="num">Totale €</th>
              <th>Periodo (settimane)</th>
              <th>Priorità</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.projects.map((p) => {
              const days = projectDays(p)
              const remaining = projectRemainingDays(p)
              return (
                <tr key={p.id}>
                  <td>
                    <span
                      className="color-pick"
                      style={{ background: p.color }}
                      title={p.color}
                    />
                  </td>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td style={{ fontSize: 12, color: "#57534e", maxWidth: 220 }}>
                    {p.stack}
                  </td>
                  <td>
                    <select
                      className="edit"
                      value={p.status}
                      onChange={(e) =>
                        updateProject(p.id, {
                          status: e.target.value as ProjectStatus,
                        })
                      }
                    >
                      {Object.entries(PROJECT_STATUS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="num">
                    <span
                      className="computed"
                      title={`${fmt(days)} totali (${fmt(days - remaining)} completati)`}
                    >
                      {fmt(remaining)}
                    </span>
                  </td>
                  <td className="num">
                    <input
                      className="edit"
                      type="number"
                      min={0}
                      step={10}
                      value={p.rate}
                      onChange={(e) =>
                        updateProject(p.id, {
                          rate: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </td>
                  <td className="num">
                    <strong>{fmtEur(days * p.rate)}</strong>
                  </td>
                  <td>
                    <select
                      className="edit"
                      value={p.weekStart}
                      onChange={(e) =>
                        updateProject(p.id, {
                          weekStart: parseInt(e.target.value),
                        })
                      }
                    >
                      {WEEKS.map((w) => (
                        <option key={w} value={w}>
                          W{w}
                        </option>
                      ))}
                    </select>
                    {" → "}
                    <select
                      className="edit"
                      value={p.weekEnd}
                      onChange={(e) =>
                        updateProject(p.id, {
                          weekEnd: parseInt(e.target.value),
                        })
                      }
                    >
                      {WEEKS.map((w) => (
                        <option key={w} value={w}>
                          W{w}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="edit"
                      value={p.priority}
                      onChange={(e) =>
                        updateProject(p.id, {
                          priority: e.target.value as Priority,
                        })
                      }
                    >
                      {Object.entries(PRIORITY).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-icon danger"
                      onClick={() => {
                        if (
                          confirm(
                            `Eliminare il progetto "${p.name}" e tutti i suoi task?`
                          )
                        ) {
                          deleteProject(p.id)
                        }
                      }}
                      title="Elimina progetto"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td colSpan={4}>Totale</td>
              <td className="num" title={`${fmt(totals.totalDays)} totali`}>
                {fmt(totals.remainingDays)}
              </td>
              <td className="num">{Math.round(totals.avgRate)}</td>
              <td className="num">{fmtEur(totals.totalRev)}</td>
              <td colSpan={3}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

import type { DashboardStore } from "./useDashboardStore"
import type { Project, TaskStatus } from "../../lib/smoothie/types"
import { TASK_STATUS } from "../../lib/smoothie/types"
import { projectDays, fmtEur } from "../../lib/smoothie/calc"

interface Props {
  project: Project
  store: DashboardStore
}

export function ProjectCard({ project: p, store }: Props) {
  const {
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    addRisk,
    updateRisk,
    deleteRisk,
  } = store
  const days = projectDays(p)
  const total = days * p.rate

  return (
    <div className="card" style={{ borderTopColor: p.color }}>
      <div className="card-head">
        <div className="card-title">
          <input
            className="edit text"
            type="text"
            value={p.name}
            onChange={(e) => updateProject(p.id, { name: e.target.value })}
            style={{ fontWeight: 700, fontSize: 16, width: "100%" }}
          />
        </div>
        <div className="card-actions">
          <input
            type="color"
            value={p.color}
            onChange={(e) => updateProject(p.id, { color: e.target.value })}
            title="Colore"
            style={{
              width: 24,
              height: 24,
              border: "1px solid var(--c-border)",
              borderRadius: 4,
              cursor: "pointer",
              padding: 0,
              background: "transparent",
            }}
          />
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
        </div>
      </div>

      <div className="card-meta-row">
        <div className="meta-field">
          <span className="meta-lbl">Stack</span>
          <input
            className="edit text"
            type="text"
            value={p.stack}
            onChange={(e) => updateProject(p.id, { stack: e.target.value })}
          />
        </div>
        <div className="meta-field">
          <span className="meta-lbl">Reference</span>
          <input
            className="edit text"
            type="text"
            value={p.ref}
            placeholder="https://…"
            onChange={(e) => updateProject(p.id, { ref: e.target.value })}
          />
        </div>
        <div className="meta-field">
          <span className="meta-lbl">Tariffa €/gg</span>
          <input
            className="edit"
            type="number"
            min={0}
            step={10}
            value={p.rate}
            onChange={(e) =>
              updateProject(p.id, { rate: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
        <div className="meta-field">
          <span className="meta-lbl">Totale</span>
          <strong style={{ fontSize: 14 }}>
            {days}gg · {fmtEur(total)}
          </strong>
        </div>
      </div>

      <div className="card-section">
        <div className="lbl">Scope</div>
        <textarea
          className="edit"
          rows={3}
          value={p.scope}
          onChange={(e) => updateProject(p.id, { scope: e.target.value })}
        />
      </div>

      <div className="card-section">
        <div className="lbl">
          <span>Aspetti da sviluppare</span>
          <span
            style={{
              textTransform: "none",
              letterSpacing: 0,
              fontSize: 11,
              color: "var(--c-faint)",
              fontWeight: 500,
            }}
          >
            {p.tasks.length} task · {days} gg totali
          </span>
        </div>
        <div className="tasks-table-wrap">
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Task</th>
                <th className="num" style={{ width: 60 }}>
                  gg
                </th>
                <th style={{ width: 110 }}>Stato</th>
                <th style={{ width: 28 }}></th>
              </tr>
            </thead>
            <tbody>
              {p.tasks.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span
                      className={`task-status-dot task-status-${t.status}`}
                    />
                    <input
                      className="edit text"
                      type="text"
                      value={t.name}
                      onChange={(e) =>
                        updateTask(p.id, t.id, { name: e.target.value })
                      }
                    />
                  </td>
                  <td className="num">
                    <input
                      className="edit"
                      type="number"
                      min={0}
                      step={0.5}
                      value={t.days}
                      onChange={(e) =>
                        updateTask(p.id, t.id, {
                          days: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="edit"
                      value={t.status}
                      onChange={(e) =>
                        updateTask(p.id, t.id, {
                          status: e.target.value as TaskStatus,
                        })
                      }
                    >
                      {Object.entries(TASK_STATUS).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-icon danger"
                      onClick={() => deleteTask(p.id, t.id)}
                      title="Rimuovi task"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="tasks-total">
                <td>Totale</td>
                <td className="num">{days}</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="btn-add-task" onClick={() => addTask(p.id)}>
          + Aggiungi task
        </button>
      </div>

      <div className="card-section">
        <div className="lbl">
          <span>Rischi</span>
          <button
            className="btn-icon"
            onClick={() => addRisk(p.id)}
            title="Aggiungi rischio"
            style={{ fontSize: 16 }}
          >
            +
          </button>
        </div>
        <ul className="risks-list">
          {p.risks.length === 0 ? (
            <li
              style={{ color: "var(--c-faint)", fontStyle: "italic" }}
              className="empty"
            >
              Nessun rischio annotato
            </li>
          ) : (
            p.risks.map((r, i) => (
              <li key={i}>
                <textarea
                  className="edit"
                  rows={1}
                  value={r}
                  onChange={(e) => updateRisk(p.id, i, e.target.value)}
                />
                <button
                  className="btn-icon danger"
                  onClick={() => deleteRisk(p.id, i)}
                  title="Rimuovi rischio"
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

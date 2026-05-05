import type { DashboardTotals } from "../../lib/smoothie/calc"
import { fmt, fmtEur } from "../../lib/smoothie/calc"

interface Props {
  totals: DashboardTotals
  availableDays: number
  onAvailableDaysChange: (days: number) => void
}

export function KPICards({
  totals,
  availableDays,
  onAvailableDaysChange,
}: Props) {
  const {
    totalDays,
    totalRev,
    avgRate,
    totalTasks,
    totalProjects,
    buffer,
    capacityPct,
  } = totals

  let bufferLabel: string
  let bufferSub: string
  let bufferClass = ""
  if (buffer >= 2) {
    bufferLabel = `+${fmt(buffer)} gg`
    bufferSub = "buffer disponibile"
    bufferClass = "ok"
  } else if (buffer >= 0) {
    bufferLabel = `+${fmt(buffer)} gg`
    bufferSub = "margine quasi nullo"
  } else {
    bufferLabel = `${fmt(buffer)} gg`
    bufferSub = "sforamento bimestre"
    bufferClass = "alert"
  }

  const capacityPctClamped = Math.min(120, capacityPct)
  const fillWidth = Math.min(100, capacityPctClamped)
  const overCapacity = capacityPctClamped > 100

  let capWarning: string
  let capWarningOk = false
  if (capacityPct > 105) {
    capWarning = `⚠ Sforamento ~${Math.round(capacityPct - 100)}%: rinegoziare scope o tempi.`
  } else if (capacityPct > 95) {
    capWarning = `⚠ Margine sottile (buffer ${Math.round(100 - capacityPct)}%): considerare riduzione scope.`
  } else {
    capWarning = `✓ Carico sostenibile con ${Math.round(100 - capacityPct)}% di buffer.`
    capWarningOk = true
  }

  return (
    <>
      <h2>Riepilogo</h2>
      <div className="kpis">
        <div className="kpi">
          <div className="kpi-label">Giornate stimate</div>
          <div className="kpi-value">{fmt(totalDays)}</div>
          <div className="kpi-sub">su {availableDays} disponibili</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Totale economico</div>
          <div className="kpi-value">{fmtEur(totalRev)}</div>
          <div className="kpi-sub">{Math.round(avgRate)} €/gg medi</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Progetti</div>
          <div className="kpi-value">{totalProjects}</div>
          <div className="kpi-sub">{totalTasks} task totali</div>
        </div>
        <div className={`kpi ${bufferClass}`}>
          <div className="kpi-label">Buffer / Sforamento</div>
          <div className="kpi-value">{bufferLabel}</div>
          <div className="kpi-sub">{bufferSub}</div>
        </div>
      </div>

      <div className="cap-bar-wrap">
        <div className="cap-row">
          <div>
            <strong>Capacity check</strong>
            <span style={{ fontSize: 13, color: "#44403c", marginLeft: 8 }}>
              {fmt(totalDays)} / {availableDays} gg ({Math.round(capacityPct)}%)
            </span>
          </div>
          <div className="cap-input-row">
            Giornate disponibili:
            <input
              className="edit"
              type="number"
              min={1}
              value={availableDays}
              onChange={(e) =>
                onAvailableDaysChange(parseInt(e.target.value) || 1)
              }
              style={{ width: 55 }}
            />
          </div>
        </div>
        <div className="cap-bar-track">
          <div
            className={overCapacity ? "cap-bar-fill over" : "cap-bar-fill"}
            style={{ width: `${fillWidth}%` }}
          />
        </div>
        <div className={capWarningOk ? "cap-warning ok" : "cap-warning"}>
          {capWarning}
        </div>
      </div>
    </>
  )
}

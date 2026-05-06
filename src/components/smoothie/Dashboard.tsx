import { useMemo } from "react"
import type { DashboardState } from "../../lib/smoothie/types"
import { computeTotals } from "../../lib/smoothie/calc"
import { useDashboardStore } from "./useDashboardStore"
import { useDebouncedSave } from "./useDebouncedSave"
import { SaveIndicator } from "./SaveIndicator"
import { KPICards } from "./KPICards"
import { ProjectsTable } from "./ProjectsTable"
import { Gantt } from "./Gantt"
import { ProjectCard } from "./ProjectCard"
import { Toolbar } from "./Toolbar"

interface Props {
  initialState: DashboardState
}

export default function Dashboard({ initialState }: Props) {
  const store = useDashboardStore(initialState)
  const { state, setAvailableDays, addProject } = store
  const totals = useMemo(() => computeTotals(state), [state])
  const saveStatus = useDebouncedSave(state, initialState)

  return (
    <div className="smoothie-root">
      <SaveIndicator status={saveStatus} />
      <div className="wrap">
        <div className="topbar">
          <div>
            <h1>Bimestre Maggio-Luglio 2026</h1>
            <p className="sub">
              Coordinamento progetti web agenzia Smoothie · 4 mag → 20 giu 2026
              (go-live: 10 giu Heli/Itajourney, 20 giu ATC/Red)
            </p>
          </div>
          <div className="topbar-actions">
            <a
              className="btn"
              href="/smoothie/richiesta-info/"
              target="_blank"
              rel="noopener"
            >
              📄 Richiesta info preliminari
            </a>
          </div>
        </div>

        <KPICards
          totals={totals}
          availableDays={state.availableDays}
          onAvailableDaysChange={setAvailableDays}
        />

        <ProjectsTable store={store} totals={totals} />

        <Gantt projects={state.projects} />

        <h2>
          Aspetti da sviluppare per progetto
          <span className="hint">
            aggiungi / rinomina / rimuovi i task — la somma delle giornate
            diventa il totale del progetto
          </span>
        </h2>
        <div className="cards">
          {state.projects.map((p) => (
            <ProjectCard key={p.id} project={p} store={store} />
          ))}
        </div>
        <button
          className="btn-add-project"
          onClick={addProject}
          style={{ marginTop: 16 }}
        >
          + Aggiungi progetto
        </button>

        <Toolbar />

        <div className="note">
          <strong>Note di pianificazione</strong>
          <br />• <strong>Stack di default Astro + Strapi</strong> (coerente con
          Smoothie Communicate già in produzione). React solo come island Astro
          su Itajourney booking (filtri, calendar).
          <br />• <strong>Capacity</strong>: 34 gg lavorativi (4 mag → 20 giu, 7
          settimane − festivo 2 giu). Le tariffe (250 €/gg uniforme) sono
          placeholder in attesa di riallineamento alla prossima call con
          cliente.
          <br />• <strong>Rischio principale</strong>: integrazione TeamSystem
          Hospitality su Itajourney. Anticipare richiesta credenziali e doc API
          entro la settimana 1.
          <br />• <strong>Tutti i valori sono modificabili</strong>. Per
          cambiare il numero di task, usa "+ Aggiungi task" nella card del
          progetto.
        </div>
      </div>
    </div>
  )
}

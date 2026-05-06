export function Toolbar() {
  async function logout() {
    await fetch("/smoothie/api/logout/", {
      method: "POST",
      credentials: "same-origin",
    })
    window.location.href = "/smoothie/login/"
  }

  async function resetToSeed() {
    const ok = window.confirm(
      "Sovrascrivi lo state corrente con il seed di default?\nL'azione non è reversibile."
    )
    if (!ok) return
    const res = await fetch("/smoothie/api/reset/", {
      method: "POST",
      credentials: "same-origin",
    })
    if (!res.ok) {
      alert(`Reset fallito: HTTP ${res.status}`)
      return
    }
    window.location.reload()
  }

  async function exportJson() {
    const res = await fetch("/smoothie/api/state/", {
      credentials: "same-origin",
      cache: "no-store",
    })
    if (!res.ok) {
      alert(`Export fallito: HTTP ${res.status}`)
      return
    }
    const data = await res.json()
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "smoothie-defaults.json"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="toolbar" style={{ marginTop: 24 }}>
      <button
        className="btn"
        onClick={exportJson}
        style={{ marginLeft: "auto" }}
      >
        Export JSON
      </button>
      <button className="btn" onClick={resetToSeed}>
        Reset al seed
      </button>
      <button className="btn" onClick={logout}>
        Esci
      </button>
    </div>
  )
}

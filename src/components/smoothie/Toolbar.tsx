export function Toolbar() {
  async function logout() {
    await fetch("/smoothie/api/logout/", {
      method: "POST",
      credentials: "same-origin",
    })
    window.location.href = "/smoothie/login/"
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
      <button className="btn" onClick={logout}>
        Esci
      </button>
    </div>
  )
}
